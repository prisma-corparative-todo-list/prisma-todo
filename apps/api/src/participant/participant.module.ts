import { Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { PrismaModule } from '../prisma/prisma.module';
import { GroupModule } from '../group/group.module';
import { ParticipantController } from './participant.controller';

@Module({
  imports: [PrismaModule,GroupModule],
  providers: [ParticipantService],
  exports: [ParticipantService],
  controllers: [ParticipantController]
})
export class ParticipantModule {}
