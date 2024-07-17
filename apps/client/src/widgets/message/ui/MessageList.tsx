import { MessageItem } from '../../../entities/message';
import { FC, ReactNode, useEffect, useRef } from 'react';
import { IMessageAndUser } from 'interfaces';
import ScrollToBottom from 'react-scroll-to-bottom';

interface IProps {
  messages: IMessageAndUser[];
  children: ReactNode;
}

export const MessageList: FC<IProps> = ({ messages, children }) => {

  const messageEndRef = useRef(null)

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
  },[])

  return (
    <>
      {children}
      <ul className="list-none h-[87%] overflow-auto rounded-lg pl-5">
        {messages?.reverse().map((message, idx) => (
          <MessageItem message={message} key={idx} />
        ))}
        <li />
      </ul>
    </>
  );
};
