import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma';
import { Folder, Prisma, Task } from 'prisma/prisma-client';
import { WorkFlow } from '../../../../interfaces';

@Injectable()
export class FolderService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(data: Prisma.FolderCreateInput): Promise<Folder> {
    return await this.prisma.folder.create({ data });
  }

  public async updateOne(
    data: Prisma.FolderUpdateInput,
    whereOptions: Prisma.FolderWhereUniqueInput
  ): Promise<Folder> {
    return await this.prisma.folder.update({ data, where: whereOptions });
  }

  public async findMany(payload: Prisma.FolderWhereInput): Promise<Folder[]> {
    return await this.prisma.folder.findMany({ where: payload });
  }

  public async deleteOne(
    payload: Prisma.FolderWhereUniqueInput
  ): Promise<void> {
    await this.prisma.folder.delete({ where: payload });
  }

  public async findOne(
    payload: Prisma.FolderWhereUniqueInput
  ): Promise<WorkFlow<Folder,Task>> {
    
    const folder = await this.prisma.folder.findFirst({
      where: payload,
      include: { tasks: true },
    });

    return {
        main: { title: folder.title, userId: folder.userId, id: folder.id },
        items: folder.tasks,
    };
  }
}
