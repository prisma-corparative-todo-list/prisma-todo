import {
  getHoursAndMinutes,
  getWeedayMonthAndDay,
  getWeedayMonthAndDayAndTime,
  useUserStore,
} from '../../../shared';
import { IMessageAndUser } from 'interfaces';

import { FC } from 'react';

interface IProps {
  message: IMessageAndUser;
}

export const MessageItem: FC<IProps> = ({ message }) => {
  const { userId } = useUserStore();

  return (
    <li
      className={`bg-[white] mb-5 p-2 rounded-lg max-w-[40%] ${
        userId === message.user.id
          ? 'ml-auto mr-5 flex flex-col-reverse'
          : 'flex justify-between '
      }`}
    >
      <div>
        {message.userId !== userId && <p>{message.user.userName}</p>}
        <p>{message.text}</p>
      </div>
      <div>
        <p className={`${userId === message.userId ? 'text-right' : ''}`}>
          {new Date(message.createAt).getDate() === new Date().getDate()
            ? `today at ${getHoursAndMinutes(message.createAt)}`
            : getWeedayMonthAndDayAndTime(message.createAt)}
        </p>
      </div>
    </li>
  );
};
