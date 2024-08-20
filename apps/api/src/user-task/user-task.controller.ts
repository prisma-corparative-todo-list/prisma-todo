import { Body, Controller } from '@nestjs/common';
import { CreateUserTaskDto } from './dto/create-user-task.dto';
import { UserTaskService } from './user-task.service';

@Controller('user-task')
export class UserTaskController {

    constructor(
        private readonly userTaskService: UserTaskService
    ){}

    public async createMany(@Body() dto: CreateUserTaskDto) {
        return await this.userTaskService.createMany(dto)
    }
}
