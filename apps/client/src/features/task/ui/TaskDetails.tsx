import {
  useGetSteps,
  useGetTask,
  usePostStep,
  useDeleteTask,
  useUpdateTask,
  IEventClick,
} from '../../../shared';
import { FC, useEffect, useState } from 'react';
import { Checkbox, TextField } from '@mui/material';
import { StepItem } from '../../../entities/step/';

interface IProps {
  taskId: string;
  onToggleComplete: (taskId: string) => void;
  toggleCompleteTaskIsSuccess: boolean;
  refetchTasks: () => void;
  title: string;
  description: string;
  taskIsSuccess: boolean;
  refetchTask: () => void;
  isCompleted: boolean;
}

export const TaskDetails: FC<IProps> = ({
  taskId,
  onToggleComplete,
  toggleCompleteTaskIsSuccess,
  refetchTasks,
  refetchTask,
  taskIsSuccess,
  title,
  description,
  isCompleted,
}) => {
  const [titleValue, setTitleValue] = useState('');

  const [descriptionValue, setDescriptionValue] = useState('');

  const { updateTask, updateTaskIsSuccess } = useUpdateTask(taskId);

  const handleToggleComplete = () => onToggleComplete(taskId);

  const handleUpdateTitle = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    updateTask({ title: titleValue });
  };

  const handleUpdateDescription = (
    e: React.FocusEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    updateTask({ description: descriptionValue });
  };

  useEffect(() => {
    if (taskIsSuccess) {
      setTitleValue(title);
      setDescriptionValue(description ?? '');
    }
  }, [title, description, taskIsSuccess]);

  useEffect(() => {
    if (taskIsSuccess && title) {
      setTitleValue(title);
      setDescriptionValue(description ?? '');
    }
    if (toggleCompleteTaskIsSuccess || updateTaskIsSuccess) {
      refetchTask();
      refetchTasks();
    }
  }, [
    refetchTask,
    toggleCompleteTaskIsSuccess,
    taskIsSuccess,
    title,
    updateTaskIsSuccess,
    refetchTasks,
    description,
  ]);

  return (
    <div className="mb-2 border-2 p-2 mx-2 mt-2 rounded-lg">
      {
        <>
          <div className="mb-2">
            <Checkbox
              onClick={handleToggleComplete}
              checked={isCompleted ?? false}
            />
            <input
              type="text"
              className="outline-none border-b-2 border-black pb-2"
              onChange={(e) => setTitleValue(e.target.value)}
              value={titleValue}
              onBlur={handleUpdateTitle}
            />
          </div>
          <textarea
            className="w-full outline-none border-b-2"
            rows={descriptionValue.length >= 50 ? 5 : 3}
            onChange={(e) => setDescriptionValue(e.target.value)}
            value={descriptionValue}
            onBlur={handleUpdateDescription}
          />
        </>
      }
    </div>
  );
};
