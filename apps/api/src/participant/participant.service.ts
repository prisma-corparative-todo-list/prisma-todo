import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Participant, Prisma, User } from 'prisma/prisma-client';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { IUserWithUserRole } from '../../../../interfaces';

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
    return await this.prisma.participant.count({ where: payload });
  }

  public async findMany(
    payload: Prisma.ParticipantWhereInput
  ): Promise<IUserWithUserRole[]> {
    const participants = await this.prisma.participant.findMany({
      where: payload,
      select: { user: true, role: true },
    });

    return participants.map((participant) => ({
      ...participant.user,
      role: participant.role,
    }))
  }
}
