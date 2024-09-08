import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Group, Participant, Prisma } from 'prisma/prisma-client';
import { ParticipantService } from 'participant/participant.service';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { IGroupWithUserRole } from '../../../../interfaces';

@Injectable()
export class GroupService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly participantService: ParticipantService
  ) {}

  public async create(data: Prisma.GroupCreateInput): Promise<Group> {
    return await this.prisma.group.create({ data });
  }

  public async findOne(
    payload: Prisma.GroupWhereInput,
    userId: string
  ): Promise<IGroupWithUserRole> {
    const group = await this.prisma.group.findFirst({ where: payload });

    const participant = await this.participantService.findOne({
      groupId: group.id,
      userId,
    });

    return {
      ...group,
      role: participant?.role,
    };
  }

  public async findMany(
    payload: Prisma.GroupWhereInput = {}
  ): Promise<Group[]> {
    return await this.prisma.group.findMany({
      where: payload,
      include: { participants: true },
    });
  }

  public async leave(userId: string, groupId: string): Promise<void> {
    await this.prisma.participant.deleteMany({
      where: {
        userId,
        groupId,
      },
    });
  }

  public async deleteOne(payload: Prisma.GroupWhereUniqueInput): Promise<void> {
    await this.prisma.group.delete({ where: payload });
  }

  public async updateOne(
    payload: Prisma.GroupUpdateInput,
    whereOptions: Prisma.GroupWhereUniqueInput
  ): Promise<Group> {
    return await this.prisma.group.update({
      data: payload,
      where: whereOptions,
    });
  }
  public async joinToGroup(
    groupId: string,
    userId: string
  ): Promise<Participant | null> {
    const candidate = await this.participantService.findOne({
      groupId,
      userId,
    });

    if (candidate) {
      return null;
    }

    const role =
      (await this.getOwnerId(groupId, userId)) === userId
        ? 'ADMIN'
        : 'PARTICIPANT';

    const participant = await this.participantService.createOne({
      group: { connect: { id: groupId } },
      user: { connect: { id: userId } },
      role,
    });

    return participant;
  }

  private async getOwnerId(groupId: string, userId: string) {
    const group = await this.findOne(
      {
        id: groupId,
      },
      userId
    );
    return group.ownerId;
  }
}
