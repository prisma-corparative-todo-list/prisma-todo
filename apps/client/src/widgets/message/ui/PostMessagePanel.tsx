import { UseMutateFunction } from '@tanstack/react-query';
import { ICreateMessageDto } from '../../../shared';
import { FC, useState } from 'react';
import { useParams } from 'react-router';
import { IResponseMessageAndUser } from 'interfaces';
import { FilesPickerButton } from '../../../features/file-picker';

interface IProps {
  postMessage: UseMutateFunction<
    IResponseMessageAndUser,
    Error,
    Omit<ICreateMessageDto, 'userId'>,
    unknown
  >;
}

export const PostMessagePanel: FC<IProps> = ({ postMessage }) => {
  const { groupId } = useParams();

  const [text, setText] = useState<string>('');

  const handleSendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || text.length < 1 || groupId === undefined) return;
    postMessage({ text, groupId });
    setText('');
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div className='w-[70%] py-3 bg-white px-5 rounded-xl mx-auto flex justify-between'>
      <input
        className="outline-none"
        type="text"
        placeholder="Message"
        onKeyDown={handleSendMessage}
        onChange={handleChangeText}
        value={text}
      />
      <FilesPickerButton/>
    </div>
  );
};
