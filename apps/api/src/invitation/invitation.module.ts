import { Module } from '@nestjs/common';
import { InvitationController } from './invitation.controller';
import { InvitationService } from './invitation.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { ParticipantModule } from '../participant/participant.module';

@Module({
  imports: [PrismaModule,UserModule,ParticipantModule],
  controllers: [InvitationController],
  providers: [InvitationService]
})
export class InvitationModule {}
