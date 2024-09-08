import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MessageService } from './message.service';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { IResponseMessageAndUser } from '../../../../interfaces';
import { CreateMessageDto } from './dto/create-message.dto';
import { ChatGateway } from '../chat/chat.gateway';
import { CurrentUser } from 'user/decorators/current-user.decorator';
import { User } from 'prisma/prisma-client';
import { AccessTokenGuard } from 'auth/guards/access-token.guard';

@UseGuards(AccessTokenGuard)
@Controller('message')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly chatGateway: ChatGateway
  ) {}

  private logger = new Logger(MessageController.name);

  @Get(':groupId')
  public async findMany(
    @Param('groupId') groupId: string,
    @Query('cursor', ParseIntPipe) cursor?: number,
    @Query('limit', ParseIntPipe) limit?: number
  ): Promise<IResponseMessageAndUser> {
    return await this.messageService.findMany({ groupId }, { cursor, limit });
  }

  @Post()
  public async createOne(
    @Body() body: CreateMessageDto,
    @CurrentUser() user: User
  ) {
    this.chatGateway.onMessage({...body}, user);
  }
}
