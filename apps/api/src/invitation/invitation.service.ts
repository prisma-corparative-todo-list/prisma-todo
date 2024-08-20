import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Invitation, Prisma } from 'prisma/prisma-client';

@Injectable()
export class InvitationService {
  constructor(private readonly prisma: PrismaService) {}

  public async createOne(payload: Prisma.InvitationCreateInput): Promise<Invitation> {
    return await this.prisma.invitation.create({
      data: payload,
    });
  }

  public async findMany(payload: Prisma.InvitationWhereInput): Promise<Invitation[]> {
    return await this.prisma.invitation.findMany({
      where: payload,
    });
  }

  public async deleteOne(payload: Prisma.InvitationWhereUniqueInput): Promise<void> {
    await this.prisma.invitation.delete({
      where: payload,
    });
  }
}
