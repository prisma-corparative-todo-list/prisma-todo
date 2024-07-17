import {
  useGetSteps,
  useGetTask,
  usePostStep,
  useDeleteTask,
  useUpdateTask,
} from '../../../shared';
import { FC, useEffect, useState } from 'react';
import { Checkbox, TextField } from '@mui/material';
import { StepItem } from '../../../entities/step/';

interface IProps {
  taskId?: string;
  onToggleComplete: (taskId: string) => void;
  toggleCompleteTaskIsSuccess: boolean;
  onClose: () => void;
  refetchTasks: () => void;
}

export const TaskDetails: FC<IProps> = ({
  taskId,
  onToggleComplete,
  toggleCompleteTaskIsSuccess,
  refetchTasks,
  onClose,
}) => {
  const [step, setStep] = useState('');

  const [title, setTitle] = useState<string>('');

  const [description, setDescription] = useState('');

  const { task, refetch: refetchTask, taskIsSuccess } = useGetTask(taskId);

  const { steps, refetchSteps, stepsIsSuccess } = useGetSteps(taskId);

  const { postStepIsSuccess, postStep } = usePostStep();

  const {
    updateTask,
    updateTaskIsLoading,
    updateTaskIsError,
    updateTaskIsSuccess,
  } = useUpdateTask(taskId);

  const handlePostStep = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (step.length < 1) return;
      postStep({ taskId, content: step });
      setStep('');
    }
  };

  const handleUpateTask = (event: React.FocusEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (title.length < 1 && description.length < 1) return;
    updateTask({ title: title, description: description, id: taskId });
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleStepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStep(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  useEffect(() => {
    refetchTask();
  }, []);

  useEffect(() => {
    if (taskIsSuccess || updateTaskIsSuccess) {
      setTitle(task!.title);
      setDescription(task!.description || '');
    }
    if (
      updateTaskIsSuccess ||
      toggleCompleteTaskIsSuccess ||
      postStepIsSuccess
    ) {
      refetchTasks();
      refetchTask();
      refetchSteps();
    }
  }, [
    taskIsSuccess,
    updateTaskIsSuccess,
    toggleCompleteTaskIsSuccess,
    postStepIsSuccess,
  ]);

  return (
    <div className="px-5 pt-5 h-[30%] relative">
      <div className="flex gap-5 mb-5">
        <Checkbox
          checked={task?.isCompleted || false}
          id={taskId}
          onClick={(e: any) => onToggleComplete(e.target.id)}
        />
        <input
          className="border-b-2 outline-none px-5"
          defaultValue={title}
          onBlur={handleUpateTask}
          onChange={handleChangeTitle}
          type="text"
          placeholder="task content"
        />
      </div>
      <div className="mb-5">
        <input
          type="text"
          className="border-b-2 outline-none w-full px-5 py-2 mb-3"
          onKeyUp={handlePostStep}
          value={step}
          onChange={handleStepChange}
          placeholder="add steps"
        />
        <ul
          className={`${
            steps !== undefined &&
            steps.length >= 3 &&
            'h-[250px] overflow-auto'
          } `}
        >
          {steps !== undefined &&
            steps.map((step) => (
              <StepItem
                refetchSteps={refetchSteps}
                refetchTasks={refetchTasks}
                key={step.id}
                step={step}
              />
            ))}
        </ul>
      </div>
      <TextField
        placeholder="description"
        sx={{ display: 'block' }}
        multiline={true}
        defaultValue={description}
        onChange={handleDescriptionChange}
        onBlur={handleUpateTask}
        rows={5}
      />
    </div>
  );
};
