import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JoinSessionDto } from './dto/join-session.dto';
import { ParticipantService } from '../participant/participant.service';
import { MessageService } from '../message/message.service';
import { CreateMessageDto } from '../message/dto/create-message.dto';
import { WsCurrentUser } from '../user/decorators/ws-current-user.decorator';
import { Logger } from '@nestjs/common';
import { User } from 'prisma/prisma-client';

@WebSocketGateway({ cors: { origin: '*' }, credentials: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly participantService: ParticipantService,
    private readonly messageService: MessageService
  ) {}

  private logger = new Logger(ChatGateway.name);

  @WebSocketServer()
  server: Server = new Server();

  handleConnection(client: Socket) {
    console.log('connect');
  }
  handleDisconnect(client: Socket) {
    console.log('disconnect');
  }

  @SubscribeMessage('message')
  async onMessage(
    client: Socket,
    @MessageBody()
    payload: CreateMessageDto,
    @WsCurrentUser() user: User
  ) {
    const createdMessage = await this.messageService.createOne({
      ...payload,
      userId: user.id,
    });

    const message = await this.messageService.findOne({
      groupId: createdMessage.groupId,
      id: createdMessage.id
    });

    this.server.to(payload.groupId).emit('message', message);

    this.logger.log(message);

    return message
  }

  @SubscribeMessage('join_session')
  async onJoin(
    client: Socket,
    @MessageBody() payload: JoinSessionDto,
    @WsCurrentUser() user: User
  ) {
    this.logger.log(payload.socketId);
    if (payload.socketId) {
      const participent = await this.participantService.joinToGroup(
        payload.groupId,
        user.id
      );

      this.server.in(payload.socketId).socketsJoin(payload.groupId)
    }
  }
}
