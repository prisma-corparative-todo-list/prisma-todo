import { getWeedayMonthAndDay } from '../../../shared';
import { ICreateTask } from 'interfaces';
import { FC } from 'react';

interface IProps {
  createTaskIsError: boolean;
  createTaskSubmittedAt: number;
  createTaskVariables?: ICreateTask;
}

export const OptimisticTaskItem: FC<IProps> = ({
  createTaskIsError,
  createTaskSubmittedAt,
  createTaskVariables,
}) => {
  return (
    <li className={`border-2 border-black px-5 py-5 rounded-lg flex justify-between mb-2 cursor-pointer ${createTaskIsError ? 'border-rose-600' : ''}`}>
      <p className="text-left">{createTaskVariables?.title}</p>
      <span className={`mr-2 block`}>
        {createTaskVariables?.isToday
          ? 'My day'
          : createTaskVariables?.deadLine &&
            new Date(createTaskVariables?.deadLine).getDate() ===
              new Date().getDate()
          ? 'My day'
          : createTaskVariables?.deadLine &&
            getWeedayMonthAndDay(new Date(createTaskVariables?.deadLine))}
      </span>
    </li>
  );
};
