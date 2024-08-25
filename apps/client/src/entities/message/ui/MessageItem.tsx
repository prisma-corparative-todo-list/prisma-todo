import {
  getHoursAndMinutes,
  getWeedayMonthAndDay,
  getMonthAndDayAndTime,
  useUserStore,
} from '../../../shared';
import { IMessageAndUser } from 'interfaces';

import { FC } from 'react';

interface IProps {
  message: IMessageAndUser;
}

export const MessageItem: FC<IProps> = ({ message }) => {
  const {
    user: { id: userId },
  } = useUserStore();

  return (
    <li
      className={`bg-[white] mb-5 p-2 rounded-lg max-w-[40%] flex justify-between h-[80px] ${
        message.userId === userId && 'ml-auto mr-5'
      }`}
    >
      <div className="flex gap-5">
        {message.user.id !== userId && (
          <img
            className="h-[60px] w-[60px] rounded-full"
            src="https://i.pravatar.cc"
            alt=""
          />
        )}

        <div
          className={`flex ${
            message.userId === userId ? 'items-end' : 'flex-col justify-around'
          }`}
        >
          {message.userId !== userId && <p>{message.user.userName}</p>}
          <p className="mt-auto">{message.text}</p>
        </div>
      </div>
      <p className={`${userId === message.userId ? 'text-right' : ''}`}>
        {new Date(message.createAt).getDate() === new Date().getDate()
          ? `today at ${getHoursAndMinutes(message.createAt)}`
          : getMonthAndDayAndTime(message.createAt)}
      </p>
    </li>
  );
};
