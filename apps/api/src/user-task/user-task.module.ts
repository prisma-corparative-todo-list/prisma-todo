import { Module } from '@nestjs/common';
import { UserTaskController } from './user-task.controller';
import { UserTaskService } from './user-task.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserTaskController],
  providers: [UserTaskService]
})
export class UserTaskModule {}
