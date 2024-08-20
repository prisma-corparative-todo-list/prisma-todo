import { Injectable } from '@nestjs/common';
import { CreateUserTaskDto } from './dto/create-user-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, UserTask } from 'prisma/prisma-client';

@Injectable()
export class UserTaskService {
  constructor(private readonly prisma: PrismaService) {}

  public async createMany(
    dto: CreateUserTaskDto
  ){
    return await this.prisma.userTask.createMany({
      data: dto.userIds.map((id) => ({ userId: id, taskId: dto.taskId })),
    });
  }
}
