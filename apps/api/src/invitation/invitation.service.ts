import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Invitation, Prisma } from 'prisma/prisma-client';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ExtendedInvitation, IResponseInvitation } from '../../../../interfaces';

@Injectable()
export class InvitationService {
  constructor(private readonly prisma: PrismaService) {}

  public async createOne(
    payload: Prisma.InvitationCreateInput
  ): Promise<Invitation> {
    return await this.prisma.invitation.create({
      data: payload,
    });
  }

  public async findMany(
    payload: Prisma.InvitationWhereInput,
    {
      limit,
      cursor,
    }: {
      limit: number;
      cursor: number;
    }
  ): Promise<IResponseInvitation> {
    const invitations = await this.prisma.invitation.findMany({
      where: payload,
      skip: cursor,
      take: limit,
      select: {
        group: {
          select: {
            name: true,
          },
        },
        userId: true,
        groupId: true,
        id: true,
      },
    });
    
    const transformedInvitations = invitations.map(invitation => ({
      ...invitation,
      groupName: invitation.group.name,
      group: undefined, // Optionally remove the original group object
    }));
    const nextCursor = invitations.length ? cursor + limit : null;

    return {
      data: transformedInvitations,
      nextCursor,
    };
  }

  public async deleteOne(
    payload: Prisma.InvitationWhereUniqueInput
  ): Promise<void> {
    await this.prisma.invitation.delete({
      where: payload,
    });
  }
}
