import { Module } from '@nestjs/common';
import { StepService } from './step.service';
import { PrismaModule } from 'prisma';

@Module({
  imports: [PrismaModule],
  providers: [StepService]
})
export class StepModule {}
