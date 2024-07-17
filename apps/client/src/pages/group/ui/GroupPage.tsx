import { useEffect, useState } from 'react';
import { GroupSidebar } from '../../../widgets/group';
import { MessageList } from '../../../widgets/message';
import { MenuButton, useGetExistingMessages } from '../../../shared';
import { io, Socket } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { useUserStore } from '../../../shared';
import { PostMessagePanel } from '../../../features/message';
import { Message } from 'prisma/prisma-client';
import { IMessageAndUser } from 'interfaces';
import { useInView } from 'react-intersection-observer';

export const GroupPage = () => {
  const { ref, inView } = useInView();

  const socket: Socket = io('http://localhost:3000', {
    autoConnect: true,
    extraHeaders: {
      Cookies: document.cookie,
    },
  });

  const { groupId } = useParams();

  const [messages, setMessages] = useState<IMessageAndUser[]>([]);

  const [page, setPages] = useState(1);

  const [isGroupSidebarVisible, setIsGroupSidebarVisible] =
    useState<boolean>(false);

  const handelToggleGroupSidebarVisibility = () => {
    setIsGroupSidebarVisible((prev) => !prev);
  };

  const {
    existingMessages,
    existingMessagesIsSuccess,
    fetchNextPage,
    refetchExistingMessages,
  } = useGetExistingMessages({ groupId, limit: 10, page });

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('join_session', {
        groupId,
        socketId: socket.id,
      });
    });

    socket.on('disconnect', () => {
      console.log('hi');
    });

    socket.on('message', (message) => {
      console.log(message);
      setMessages((prev) => [...prev, message]);
    });

    socket.connect();

    return () => {
      socket.off('message');
      socket.off('connect');
      socket.off('disconnect');
    };
  }, [socket.id]);

  useEffect(() => {
    if (existingMessagesIsSuccess && existingMessages?.pages[0]) {
      setMessages((prev) => [...existingMessages.pages[0], ...prev]);
    }
    refetchExistingMessages();
  }, [existingMessagesIsSuccess]);

  useEffect(() => {
    if (inView) {
      console.log(inView);
      setPages((page) => page + 1);
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className="h-screen pt-[70px]">
      <MenuButton
        onClick={handelToggleGroupSidebarVisibility}
        className="absolute right-5 top-5"
      />

      <MessageList messages={messages}>
        <li className='list-none' ref={ref} />
      </MessageList>
      <PostMessagePanel socket={socket} />
      <GroupSidebar
        isOpen={isGroupSidebarVisible}
        onClose={handelToggleGroupSidebarVisibility}
      />
    </div>
  );
};
