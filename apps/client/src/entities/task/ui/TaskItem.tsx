import { FC } from 'react';
import { Task } from 'prisma/prisma-client';
import { getWeedayMonthAndDay, IEventClick } from '../../../shared/';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Checkbox from '@mui/material/Checkbox';
import StarIcon from '@mui/icons-material/Star';
import DescriptionIcon from '@mui/icons-material/Description';
import { useGetSteps } from '../../../shared';
import { ExtendedTask } from 'interfaces';

interface IProps {
  task: ExtendedTask;
  onOpenTaskSidebar: (e: any) => void;
  onToggleCompleteTask: (e: any) => void;
  onToggleImportantStatus: (e: any) => void;
}

export const TaskItem: FC<IProps> = ({
  task: {
    deadLine,
    id: taskId,
    isImportant,
    isCompleted,
    title,
    list,
    description,
  },
  onOpenTaskSidebar,
  onToggleCompleteTask,
  onToggleImportantStatus,
}) => {
  const handleToggleImportant = (e: IEventClick<HTMLButtonElement>) => {
    e.stopPropagation();
    onToggleImportantStatus(taskId);
  };

  const handleToggleComplete = (e: IEventClick<HTMLButtonElement>) => {
    e.stopPropagation();
    onToggleCompleteTask(taskId);
  };

  const ToggleImportantButton = () => {
    return isImportant ? (
      <button id="importantButton" onClick={handleToggleImportant}>
        <StarIcon fontSize="large" />
      </button>
    ) : (
      <button id="importantButton" onClick={handleToggleImportant}>
        <StarBorderIcon fontSize="large" />
      </button>
    );
  };

  const { steps } = useGetSteps(taskId);

  return (
    <li
      id={taskId}
      className="border-2 border-black px-5 py-2 rounded-lg flex justify-between mb-2 cursor-pointer"
      onClick={onOpenTaskSidebar}
    >
      <div className="flex gap-5">
        <Checkbox checked={isCompleted} onClick={handleToggleComplete} />
        <div>
          <p className="text-left">{title}</p>
          <div className="flex">
            {list ? (
              <span className="mr-2">{list.title}</span>
            ) : (
              <span
                className={`${
                  deadLine
                    ? new Date(deadLine).getDate() < new Date().getDate()
                      ? 'text-red-600 mr-2'
                      : 'text-black-500 mr-2'
                    : ''
                }`}
              >
                {deadLine &&
                new Date(deadLine).getDate() === new Date().getDate()
                  ? 'My day'
                  : deadLine && getWeedayMonthAndDay(new Date(deadLine))}
              </span>
            )}
            {description && description.length >= 1 && (
              <span className="mr-2">
                <DescriptionIcon fontSize="small" />
              </span>
            )}
            {steps?.length ? (
              <div>
                <span>{steps.filter((el) => el.isCompleted).length}</span>
                {'/'}
                <span>{steps.length}</span>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      {!isCompleted && <ToggleImportantButton />}
    </li>
  );
};
