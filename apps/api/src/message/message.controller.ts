import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { MessageService } from './message.service';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { IResponseMessageAndUser } from '../../../../interfaces';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  private logger = new Logger(MessageController.name);

  @Get(':groupId')
  public async findMany(
    @Param('groupId') groupId: string,
    @Query('cursor', ParseIntPipe) cursor?: number,
    @Query('limit', ParseIntPipe) limit?: number
  ): Promise<IResponseMessageAndUser> {
    return await this.messageService.findMany({ groupId }, { cursor, limit });
  }

  @Post(':groupId')
  public async createOne(
    @Param('groupId') groupId: string,
    @Body() body: string
  ) {
    return ""
  }
}
