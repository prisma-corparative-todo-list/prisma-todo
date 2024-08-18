import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../model/constants';
import { socketService } from '../services/socket.service';
import { IMessageAndUser } from 'interfaces';

export const useGetMessages = (payload: {
  socketId?: string;
  groupId: number;
}) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.MESSAGE],
    queryFn: async () => {
      socketService.connect();
      if (payload.socketId) {
        socketService.joinRoom(payload);
        const messages: IMessageAndUser[] = []
        socketService.subscribeToMessages((message) => {
          messages.push(message);
        })
        return messages
      }
    },
  });
};
