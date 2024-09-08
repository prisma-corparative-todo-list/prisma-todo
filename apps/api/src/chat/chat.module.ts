import { forwardRef, Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { MessageModule } from '../message/message.module';
import { GroupModule } from '../group/group.module';

@Module({
  imports: [GroupModule, forwardRef(() => MessageModule)],
  providers: [ChatGateway],
  exports: [ChatGateway],
})
export class ChatModule {}
