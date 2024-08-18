import { io } from 'socket.io-client';
import { ICreateMessageDto } from '../../model/types/message.types';
import { Message } from 'yup';
import { IMessageAndUser } from 'interfaces';
import { group } from 'console';

export const socketService = {
  socket: io('http://localhost:3000', {
    autoConnect: false,
    extraHeaders: {
      Cookies: document.cookie,
    }
  }),

  get isConnected() {
    return this.socket.connected;
  },

  connect() {
    // this.socket.connect();
  },

  disconnect() {
    // this.socket.disconnect();
  },

  sendMessage(data: ICreateMessageDto) {
    // this.socket.emit('message', data);
  },

  subscribeToMessages(
    messageHandler: (message: IMessageAndUser) => void
  ) {
    // this.socket.on('message', messageHandler);
  },

  joinRoom(payload: { groupId?: string }) {
    // this.socket.emit('join_session', {
    //   groupId: payload.groupId,
    //   socketId: this.socket.id,
    // });
  },

  leaveRoom(payload: { groupId: string }) {
    // this.socket.emit('leave', { ...payload, socketId: this.socket.id });
  },

  off(event: string) {
   // this.socket.off(event);
  }
};
