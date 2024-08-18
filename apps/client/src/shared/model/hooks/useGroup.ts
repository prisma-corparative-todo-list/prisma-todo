import { useParams } from 'react-router-dom';
import { socket, useGetExistingMessages } from '../../../shared';
import { useEffect, useState } from 'react';
import { IMessageAndUser } from 'interfaces';

export const useGroup = () => {
  const { groupId } = useParams();

  const [messages, setMessages] = useState<IMessageAndUser[]>([]);

  const {
    existingMessages,
    existingMessagesIsSuccess,
    fetchNextPage,
    refetchExistingMessages,
    hasNextPage
  } = useGetExistingMessages({ groupId, limit: 15 });

  useEffect(() => {
    if (existingMessagesIsSuccess && existingMessages) {
      const flattenedMessages = existingMessages.pages.flatMap(
        (page) => page.data
      );
      setMessages(
        flattenedMessages.sort(
          (a, b) =>
            new Date(a.createAt).getTime() - new Date(b.createAt).getTime()
        )
      );
    }
  }, [existingMessages, existingMessagesIsSuccess]);

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      socket.emit('join_session', {
        groupId,
        socketId: socket.id,
      });
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('message', (message) => {
      setMessages((existing) =>
        [message, ...existing].sort(
          (a, b) =>
            new Date(a.createAt).getTime() - new Date(b.createAt).getTime()
        )
      );
    });

    return () => {
      socket.off('message');

      socket.off('disconnect');

      socket.off('connect');

      socket.disconnect();
    };
  }, []);

  return {
    existingMessagesIsSuccess,
    fetchNextPage,
    messages,
    hasNextPage
  };
};
