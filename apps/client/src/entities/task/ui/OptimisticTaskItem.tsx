import { getWeedayMonthAndDay } from '../../../shared';
import { ExtendedTask, ICreateTask } from 'interfaces';
import { FC } from 'react';

interface IProps {
  task: ExtendedTask;
}

export const OptimisticTaskItem: FC<IProps> = ({
  task,
}) => {
  return (
    <li className={`border-2 border-black px-5 py-5 rounded-lg flex justify-between mb-2 cursor-pointer`}>

      <p className="text-left">{task?.title}</p>
      <span className={`mr-2 block`}>
        {task?.isToday
          ? 'My day'
          : task?.deadLine &&
            new Date(task?.deadLine).getDate() ===
              new Date().getDate()
          ? 'My day'
          : task?.deadLine &&
            getWeedayMonthAndDay(new Date(task?.deadLine))}
      </span>
    </li>
  );
};
