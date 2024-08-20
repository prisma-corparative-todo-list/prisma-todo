import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Group, Prisma } from 'prisma/prisma-client';
import { ParticipantService } from 'participant/participant.service';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { IGroupInfo } from '../../../../interfaces';

@Injectable()
export class GroupService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly participantService: ParticipantService
  ) {}

  public async create(data: Prisma.GroupCreateInput): Promise<Group> {
    return await this.prisma.group.create({ data });
  }

  public async findOne(payload: Prisma.GroupWhereInput): Promise<IGroupInfo> {
    const group = await this.prisma.group.findFirst({ where: payload });

    const participants = await this.participantService.findMany({
      groupId: group.id,
    });

    return {
      ...group,
      participants
    };
  }

  public async findMany(
    payload: Prisma.GroupWhereInput = {}
  ): Promise<Group[]> {
    return await this.prisma.group.findMany({ where: payload });
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
}
