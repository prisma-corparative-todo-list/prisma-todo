import {
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from 'prisma/prisma-client';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  private logger = new Logger(MessageController.name);

  @Get(':groupId')
  public async findMany(
    @Param('groupId') groupId: string,
    @Query('page',ParseIntPipe) page?: number,
    @Query('limit',ParseIntPipe) limit?: number
  ): Promise<Message[]> {

    this.logger.log(`findMany: ${groupId}, ${page}, ${limit}`);

    return await this.messageService.findMany({ groupId }, { page, limit });
  }
}
