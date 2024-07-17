import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ParticipantModule } from '../participant/participant.module';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [ParticipantModule,MessageModule],
  providers: [ChatGateway]
})
export class ChatModule {}
