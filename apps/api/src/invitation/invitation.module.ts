import { Module } from '@nestjs/common';
import { InvitationController } from './invitation.controller';
import { InvitationService } from './invitation.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { ParticipantModule } from '../participant/participant.module';
import { GroupModule } from '../group/group.module';

@Module({
  imports: [PrismaModule,UserModule,ParticipantModule, GroupModule],
  controllers: [InvitationController],
  providers: [InvitationService]
})
export class InvitationModule {}
