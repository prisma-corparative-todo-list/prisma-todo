import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Task, User } from 'prisma/prisma-client';
import { CurrentUser } from 'user/decorators/current-user.decorator';
import { TaskService } from './task.service';
import { AccessTokenGuard } from 'auth/guards/access-token.guard';
import { CreateTaskDto } from './dto/create-task.dto';

@UseGuards(AccessTokenGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  private logger = new Logger(TaskController.name);

  @Get()
  public async findMany(
    @CurrentUser() { id: userId }: User,
    @Query('deadline') deadline: Date,
    @Query('isImportant') isImportant?: string,
    @Query('isPlanned') isPlanned?: string
  ): Promise<Task[] | null> {
    return await this.taskService.findMany({
      userId,
      deadLine: deadline,
      ...(isImportant && { isImportant: JSON.parse(isImportant) }),
      ...(isPlanned && { deadLine: { not: null } }),
    });
  }

  @Get('list/:listId')
  public async findListTasks(
    @Param('listId') listId: string
  ): Promise<Task[] | null> {
    this.logger.log(listId);

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
    });
  }

  @Patch(':taskId')
  public async updateOne(
    @Param('taskId') taskId: string,
    @Body() dto: CreateTaskDto
  ): Promise<Task> {
    this.logger.log(dto);
    return await this.taskService.updateOne(
      { id: taskId },
      {
        title: dto.title,
        id: taskId,
        ...(dto.listId ? { list: { connect: { id: dto.listId } } } : {}),
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
