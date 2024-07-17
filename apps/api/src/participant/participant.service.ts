import {
  Injectable,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Participant, Prisma } from 'prisma/prisma-client';

@Injectable()
export class ParticipantService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger(ParticipantService.name);

  public async findOne(
    payload: Prisma.ParticipantWhereInput
  ): Promise<Participant> {
    this.logger.log(payload);

    return await this.prisma.participant.findFirst({ where: payload });
  }

  public async createOne(
    data: Prisma.ParticipantCreateInput
  ): Promise<Participant> {
    return await this.prisma.participant.create({ data });
  }

  public async joinToGroup(
    groupId: string,
    userId: string
  ): Promise<Participant | null> {
    const candidate = this.findOne({
      groupId,
      userId,
    });

    if (candidate) {
      return null;
    }

    const participant = this.createOne({
      group: { connect: { id: groupId } },
      user: { connect: { id: userId } },
      role: 'PARTICIPANT',
    });

    return participant;
  }

  public async findMany(
    payload: Prisma.ParticipantWhereInput
  ): Promise<Participant[]> {
    return await this.prisma.participant.findMany({ where: payload });
  }
}
