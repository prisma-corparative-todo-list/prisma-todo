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
import { MessageService } from '../message/message.service';
import { CreateMessageDto } from '../message/dto/create-message.dto';
import { WsCurrentUser } from '../user/decorators/ws-current-user.decorator';
import { Logger } from '@nestjs/common';
import { User } from 'prisma/prisma-client';
import { GroupService } from '../group/group.service';

@WebSocketGateway({ cors: { origin: '*' }, credentials: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly groupService: GroupService,
    private readonly messageService: MessageService
  ) {}

  @WebSocketServer()
  server: Server = new Server();

  handleConnection(client: Socket) {
    console.log(`connect ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    console.log(`disconnect ${client.id}`);
  }

  @SubscribeMessage('message')
  async onMessage(
    @MessageBody()
    payload: CreateMessageDto,
    @WsCurrentUser() user: User
  ) {
    const message = await this.messageService.createOne({
      ...payload,
      userId: user.id,
    });

    const messageAndUser = await this.messageService.findOne({
      id: message.id,
    });

    this.server.to(payload.groupId).emit('message', messageAndUser);

    return messageAndUser;
  }

  @SubscribeMessage('join_session')
  async onJoin(
    client: Socket,
    @MessageBody() payload: JoinSessionDto,
    @WsCurrentUser() user: User
  ) {
  
    if (payload.socketId) {
      await this.groupService.joinToGroup(payload.groupId, user.id);

      this.server.in(payload.socketId).socketsJoin(payload.groupId);
    }
  }
}
