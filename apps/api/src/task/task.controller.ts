import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Prisma, Task, User } from 'prisma/prisma-client';
import { CurrentUser } from 'user/decorators/current-user.decorator';
import { TaskService } from './task.service';
import { AccessTokenGuard } from 'auth/guards/access-token.guard';
import { CreateTaskDto } from './dto/create-task.dto';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ExtendedTask } from '../../../../interfaces';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksQueryParamsDto } from './dto/tasks-query-params.dto';

@UseGuards(AccessTokenGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  private log = new Logger(TaskController.name);

  @Get()
  public async findMany(
    @CurrentUser() { id: userId }: User,
    @Query() queryParams: TasksQueryParamsDto,

  ): Promise<ExtendedTask[] | null> {
    

    return await this.taskService.findMany({
      userId,
      ...(queryParams.isImportant && {
        isImportant: queryParams.isImportant,
      }),
      ...(queryParams.isToday && {
        OR: [
          {
            isToday: true,
            deadLine: {
              not: null,
            },
          },
          {
            isToday: false,
            deadLine: queryParams.deadline,
          },
          {
            isToday: true,
            
          }
        ],
      }),
    });
  }

  @Get('list/:listId')
  public async findListTasks(
    @Param('listId') listId: string
  ): Promise<ExtendedTask[] | null> {
    return await this.taskService.findMany({ listId });
  }

  @Get(':taskId')
  public async findOne(@Param('taskId') taskId: string): Promise<Task> {
    return await this.taskService.findOne({ id: taskId });
  }

  @Post()
  public async create(
    @CurrentUser() { id: userId }: User,
    @Body() dto: CreateTaskDto
  ): Promise<Task> {
    return await this.taskService.create({
      title: dto.title,
      user: { connect: { id: userId } },
      ...(dto.listId ? { list: { connect: { id: dto.listId } } } : {}),
      ...(dto.deadLine ? { deadLine: dto.deadLine } : {}),
      ...(dto.isImportant ? { isImportant: dto.isImportant } : {}),
      ...(dto.isToday !== undefined ? { isToday: dto.isToday } : {}),
    });
  }

  @Patch(':taskId')
  public async updateOne(
    @Param('taskId') taskId: string,
    @Body() dto: UpdateTaskDto
  ): Promise<Task> {
    return await this.taskService.updateOne(
      { id: taskId },
      {
        ...(dto.title ? { title: dto.title } : {}),
        ...(dto.description ? { description: dto.description } : {}),
        ...(dto.listId ? { list: { connect: { id: dto.listId } } } : {}),
        ...(dto.isToday !== undefined ? { isToday: dto.isToday } : {}),
        ...(dto.deadLine ? { deadLine: dto.deadLine } : {}),
      }
    );
  }

  @Patch('/important/:taskId')
  public async toggleImportantStatus(
    @Param('taskId') taskId: string
  ): Promise<Task> {
    const { isImportant } = await this.taskService.findOne({ id: taskId });
    return await this.taskService.updateOne(
      { id: taskId },
      { isImportant: !isImportant }
    );
  }

  @Patch('/completed/:taskId')
  public async toggleCompletedStatus(
    @Param('taskId') taskId: string
  ): Promise<Task> {
    const { isCompleted } = await this.taskService.findOne({ id: taskId });
    return await this.taskService.updateOne(
      { id: taskId },
      { isCompleted: !isCompleted }
    );
  }

  @Delete(':taskId')
  public async deleteOne(@Param('taskId') taskId: string): Promise<void> {
    await this.taskService.deleteOne({ id: taskId });
  }
}
