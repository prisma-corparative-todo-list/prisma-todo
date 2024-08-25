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
  task,
  onOpenTaskSidebar,
  onToggleCompleteTask,
  onToggleImportantStatus,
}) => {
  const handleToggleImportant = (e: IEventClick<HTMLButtonElement>) => {
    e.stopPropagation();
    onToggleImportantStatus(task.id);
  };

  const handleToggleComplete = (e: IEventClick<HTMLButtonElement>) => {
    e.stopPropagation();
    onToggleCompleteTask(task.id);
  };


  const ToggleImportantButton = () => {
    return task.isImportant ? (
      <button id="importantButton" onClick={handleToggleImportant}>
        <StarIcon fontSize="large" />
      </button>
    ) : (
      <button id="importantButton" onClick={handleToggleImportant}>
        <StarBorderIcon fontSize="large" />
      </button>
    );
  };

  const { steps } = useGetSteps(task.id);

  return (
    <li
      id={task.id}
      className="border-2 border-black px-5 py-2 rounded-lg flex justify-between mb-2 cursor-pointer"
      onClick={onOpenTaskSidebar}
    >
      <div className="flex gap-5">
        <Checkbox checked={task.isCompleted} onClick={handleToggleComplete} />
        <div>
          <p className="text-left">{task.title}</p>
          <div className="flex justtify-between gap-3">
            <span
              className={
                task.deadLine
                  ? new Date(task?.deadLine).getDate() < new Date().getDate()
                    ? 'text-red-600'
                    : 'text-black-500'
                  : ''
              }
            >
              {task.deadLine &&
              new Date(task.deadLine).getDate() === new Date().getDate()
                ? 'My day'
                : task.deadLine &&
                  getWeedayMonthAndDay(new Date(task.deadLine))}
            </span>
            {task.description && task.description.length >= 1 && (
              <span>
                <DescriptionIcon fontSize="small" />
              </span>
            )}
            {
              task.list && <span>{task.list.title}</span>
            }
            {steps?.length
              ? steps?.length >= 1 && (
                  <div>
                    <span>
                      {steps?.filter((el) => el.isCompleted === true).length}
                    </span>
                    {'/'}
                    <span>{steps?.length}</span>
                  </div>
                )
              : ''}
          </div>
        </div>
      </div>
      {!task.isCompleted && <ToggleImportantButton />}
    </li>
  );
};
