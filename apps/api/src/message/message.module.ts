import { forwardRef, Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { PrismaModule } from '../prisma/prisma.module';
import { MessageController } from './message.controller';
import { ChatModule } from 'chat/chat.module';

@Module({
  imports: [PrismaModule, forwardRef(() => ChatModule)],
  providers: [MessageService],
  controllers: [MessageController],
  exports: [MessageService],
})
export class MessageModule {}
