import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Participant, Prisma, User } from 'prisma/prisma-client';

@Injectable()
export class ParticipantService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger(ParticipantService.name);

  public async findOne(
    payload: Prisma.ParticipantWhereInput
  ): Promise<Participant> {
    return await this.prisma.participant.findFirst({ where: payload });
  }

  public async createOne(
    data: Prisma.ParticipantCreateInput
  ): Promise<Participant> {
    return await this.prisma.participant.create({ data });
  }

  public async count(payload: Prisma.ParticipantWhereInput): Promise<number> {
    return await this.prisma.participant.count({where: payload});
  }

  public async joinToGroup(
    groupId: string,
    userId: string
  ): Promise<Participant | null> {
    const candidate = await this.findOne({
      groupId,
      userId,
    });

    this.logger.log(candidate);

    if (candidate) {
      return null;
    }

    const participant = await this.createOne({
      group: { connect: { id: groupId } },
      user: { connect: { id: userId } },
      role: 'PARTICIPANT',
    });

    return participant;
  }

  public async findMany(
    payload: Prisma.ParticipantWhereInput
  ): Promise<User[]> {
    const participants = await this.prisma.participant.findMany({ where: payload, select: { user: true, } });

    return participants.map(({user}) => user)
  }
}
