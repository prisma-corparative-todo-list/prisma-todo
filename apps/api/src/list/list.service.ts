import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { List, Prisma, Task } from 'prisma/prisma-client';


@Injectable()
export class ListService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(data: Prisma.ListCreateInput): Promise<List> {
    return await this.prisma.list.create({ data });
  }

  public async updateOne(
    data: Prisma.ListUpdateInput,
    whereOptions: Prisma.ListWhereUniqueInput
  ): Promise<List> {
    return await this.prisma.list.update({ data, where: whereOptions });
  }

  public async findMany(payload: Prisma.ListWhereInput): Promise<List[]> {
    return await this.prisma.list.findMany({ where: payload });
  }

  public async deleteOne(payload: Prisma.ListWhereUniqueInput): Promise<void> {
    await this.prisma.list.delete({ where: payload });
  }

  public async findOne(payload: Prisma.ListWhereUniqueInput): Promise<List> {
    return await this.prisma.list.findFirst({
      where: payload,
    });
  }
}
