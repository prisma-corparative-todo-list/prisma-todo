import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Task } from 'prisma/prisma-client';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ExtendedTask } from '../../../../interfaces';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger(TaskService.name);

  public async create(data: Prisma.TaskCreateInput): Promise<Task> {
    return await this.prisma.task.create({
      data: { ...data, createdAt: new Date(Date.now()) },
    });
  }

  public async updateOne(
    whereOptions: Prisma.TaskWhereUniqueInput,
    data: Prisma.TaskUpdateInput
  ): Promise<Task | null> {
    return await this.prisma.task.update({ where: whereOptions, data });
  }

  public async deleteOne(payload: Prisma.TaskWhereUniqueInput): Promise<void> {
    await this.prisma.task.delete({ where: payload });
  }

  public async findMany(
    payload: Prisma.TaskWhereInput
  ): Promise<ExtendedTask[] | null> {
    const tasks = await this.prisma.task.findMany({
      where: payload,
      select: {
        list: true,
        title: true,
        id: true,
        deadLine: true,
        description: true,
        listId: true,
        isCompleted: true,
        isImportant: true,
        createdAt: true,
        groupId: true,
        userId: true,
      },
    });

    return tasks.map((task) => ({ ...task, listId: undefined }));
  }

  public async findOne(payload: Prisma.TaskWhereUniqueInput): Promise<Task> {
    return await this.prisma.task.findFirst({
      where: payload,
    });
  }
}
