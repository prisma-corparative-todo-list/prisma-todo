import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma';
import { Prisma, Step, Task } from 'prisma/prisma-client';
import { WorkFlow } from '../../../../interfaces';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(data:Prisma.TaskCreateInput): Promise<Task> {
    return await this.prisma.task.create({ data })
  }

  public async updateOne(whereOptions:Prisma.TaskWhereUniqueInput,data:Prisma.TaskUpdateInput): Promise<Task | null> {
    return await this.prisma.task.update({ where:whereOptions,data })
  }

  public async deleteOne(payload:Prisma.TaskWhereUniqueInput): Promise<void> {
    await this.prisma.task.delete({ where:payload })
  }

  public async findMany(payload:Prisma.TaskWhereInput): Promise<Task[] | null> {
    return await this.prisma.task.findMany({ where:payload })
  }

  public async findOne(
    payload: Prisma.TaskWhereUniqueInput
  ): Promise<WorkFlow<Task, Step> | null> {
    const task = await this.prisma.task.findFirst({
      where: payload,
      include: {
        steps: true,
      },
    });

    return {
      main: {
        id: task.id,
        title: task.title,
        deadLine: task?.deadLine,
        description: task?.description,
        userId: task.userId,
        folderId: task?.folderId,
        groupId: task?.groupId,
      },
      items:task.steps
    };
  }


  
}
