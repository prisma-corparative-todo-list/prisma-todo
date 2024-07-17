import { Module } from '@nestjs/common';
import { StepService } from './step.service';
import { PrismaModule } from '../prisma/prisma.module';
import { StepController } from './step.controller';

@Module({
  imports: [PrismaModule],
  providers: [StepService],
  controllers: [StepController]
})
export class StepModule {}
