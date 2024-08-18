import {
  getHoursAndMinutes,
  getWeedayMonthAndDay,
  getWeedayMonthAndDayAndTime,
} from '../../../shared';
import { IMessageAndUser } from 'interfaces';

import { FC } from 'react';

interface IProps {
  message: IMessageAndUser;
}

export const MessageItem: FC<IProps> = ({ message }) => {
  return (
    <li className="bg-[white] mb-5 p-2 rounded-lg w-[50%] flex justify-between">
      <div>
        <p className="underline">{message.user.userName}</p>
        <p>{message.text}</p>
      </div>
      <div>
        <p>
          {new Date(message.createAt).getDate() === new Date().getDate()
            ? `today at ${getHoursAndMinutes(message.createAt)}`
            : getWeedayMonthAndDayAndTime(message.createAt)
          }
        </p>
      </div>
    </li>
  );
};
