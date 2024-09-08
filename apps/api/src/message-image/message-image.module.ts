import { Module } from '@nestjs/common';
import { MessageImageService } from './message-image.service';

@Module({
  providers: [MessageImageService]
})
export class MessageImageModule {}
