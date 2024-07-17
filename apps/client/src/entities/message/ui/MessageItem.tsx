import { IMessageAndUser } from 'interfaces';

import { FC } from 'react';

interface IProps {
  message: IMessageAndUser;
}

export const MessageItem: FC<IProps> = ({ message }) => {
  return (
    <li className="bg-[white] mb-5 p-2 rounded-lg">
      <p>{message.user.userName}</p>
      {message.text}
    </li>
  );
};
