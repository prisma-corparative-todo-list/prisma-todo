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
}

export const TaskDetails: FC<IProps> = ({
  taskId,
  onToggleComplete,
  toggleCompleteTaskIsSuccess,
}) => {
  const [title, setTitle] = useState('');

  const [description, setDescription] = useState('');

  const { task, taskIsSuccess, refetch: refetchTask } = useGetTask(taskId);

  const { updateTask, updateTaskIsSuccess } = useUpdateTask(taskId);

  const handleToggleComplete = () =>
    onToggleComplete(taskId);

  const handleUpdateTitle = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    updateTask({ title });
  };

  const handleUpdateDescription = (
    e: React.FocusEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    updateTask({ description });
  };

  useEffect(() => {
    if (taskIsSuccess && task) {
      setTitle(task.title);
      setDescription(task.description ?? '');
    }
    if (toggleCompleteTaskIsSuccess || updateTaskIsSuccess) {
      refetchTask();
    }
  }, [
    refetchTask,
    toggleCompleteTaskIsSuccess,
    taskIsSuccess,
    task,
    updateTaskIsSuccess,
  ]);

  return (
    <div className="mb-5 border-2 p-2 mx-2 mt-2 rounded-lg">
      {
        <>
          <div className="mb-2">
            <Checkbox
              onClick={handleToggleComplete}
              checked={task?.isCompleted ?? false}
            />
            <input
              type="text"
              className="outline-none border-b-2 border-black pb-2"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              onBlur={handleUpdateTitle}
            />
          </div>
          <textarea
            className="w-full outline-none border-b-2"
            rows={description.length >= 50 ? 5 : 3}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            onBlur={handleUpdateDescription}
          />
        </>
      }
    </div>
  );
};
