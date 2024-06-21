import { Controller, Get, Param } from '@nestjs/common';
import { Task, User } from 'prisma/prisma-client';
import { CurrentUser } from 'user/current-user.decorator';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {

    constructor(
        private readonly taskService:TaskService
    ){}

    @Get()
    public async findMany(@CurrentUser() { id:userId }: User): Promise<Task[] | null> {
        return await this.taskService.findMany({userId,})
    }

    @Get("folder/:folderId")
    public async findFolderTasks(@Param("folderId") folderId: string): Promise<Task[] | null> {
        return await this.taskService.findMany({folderId})
    }


}
