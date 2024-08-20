import { socket, socketService } from '../../../shared';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

export const PostMessagePanel: FC = () => {
  const { groupId } = useParams();

  const [text, setText] = useState<string>('');

  const handleSendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || text.length < 1 || groupId === undefined) return;
    socket.emit('message', { text: text, groupId });
    setText('');
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <input
      className="outline-none border-b-2 border-[#bcbcbc] w-[70%] bg-white py-5 px-5 rounded-xl mx-auto"
      type="text"
      placeholder="send message"
      onKeyDown={handleSendMessage}
      onChange={handleChangeText}
      value={text}
    />
  );
};
