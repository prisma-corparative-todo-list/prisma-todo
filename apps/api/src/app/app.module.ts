import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from '../mail/mail.module';
import { ListModule } from '../list/list.module';
import { TaskModule } from '../task/task.module';
import { StepModule } from '../step/step.module';
import { GroupModule } from '../group/group.module';
import { ChatModule } from '../chat/chat.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ParticipantModule } from '../participant/participant.module';
import { InvitationModule } from 'invitation/invitation.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MailModule,
    ListModule,
    TaskModule,
    StepModule,
    GroupModule,
    ChatModule,
    PrismaModule,
    ParticipantModule,
    InvitationModule
  ],
})
export class AppModule {}
