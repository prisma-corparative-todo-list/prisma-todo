import { FC, useState } from 'react';
import { Socket } from 'socket.io-client';
import { useParams } from 'react-router';

interface IProps {
  socketId?: string;
  socket: Socket;
}

export const PostMessagePanel: FC<IProps> = ({ socket }) => {
  const { groupId } = useParams();

  const [text, setText] = useState<string>('');

  const handleSendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || text.length < 1) return;
    socket.emit('message', { groupId, text });
    setText('');
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <input
      className="p-2 outline-none border-b-2 border-[#bcbcbc] absolute bottom-[15px] w-[70%] bg-white py-5 px-5 rounded-xl"
      type="text"
      placeholder="send message"
      onKeyDown={handleSendMessage}
      onChange={handleChangeText}
      value={text}
    />
  );
};
