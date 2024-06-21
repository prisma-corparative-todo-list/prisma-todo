import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma';
import { Group, Prisma } from 'prisma/prisma-client';

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(data: Prisma.GroupCreateInput): Promise<Group> {
    return await this.prisma.group.create({ data });
  }

  public async findOne(payload: Prisma.GroupWhereInput): Promise<Group> {
    return await this.prisma.group.findFirst({ where: payload });
  }

  public async findMany(
    payload: Prisma.GroupWhereInput = {}
  ): Promise<Group[]> {
    return await this.prisma.group.findMany({ where: payload });
  }

  public async leave(userId: string,groupId:string): Promise<void> {
    await this.prisma.participant.deleteMany({
        where:{
            userId,
            groupId,
        }
    })
  }

  public async deleteOne(payload: Prisma.GroupWhereUniqueInput): Promise<void> {
    await this.prisma.group.delete({where:payload})
  }

  public async updateOne(payload: Prisma.GroupUpdateInput,whereOptions: Prisma.GroupWhereUniqueInput): Promise<Group> {
    return await this.prisma.group.update({data:payload,where:whereOptions})
  }


}

