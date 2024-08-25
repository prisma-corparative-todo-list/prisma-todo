import { Checkbox } from '@mui/material';
import { Step } from 'prisma/prisma-client';
import { FC, useEffect, useState } from 'react';
import { useToggleCompleteStep, useDeleteStep } from '../../../shared';
import ClearIcon from '@mui/icons-material/Clear';
import { useUpdateStep } from '../../../shared/api/queries/step.queries';
interface IProps {
  step: Step;
  refetchTasks: () => void;
  refetchSteps: () => void;
}

export const StepItem: FC<IProps> = ({ step, refetchTasks, refetchSteps }) => {
  const [isInputVisible, setIsInputVisible] = useState(false);

  const handleToggleVisibleInput = () => {
    setIsInputVisible((prev) => !prev);
  };

  const { toggleCompleteStep, toggleCompleteStepIsSuccess } =
    useToggleCompleteStep();

  const { deleteStep, deleteStepIsSuccess } = useDeleteStep();

  const { updateStep, updateStepIsSuccess } = useUpdateStep();

  const [stepValue, setStepValue] = useState('');

  const handleChangeStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStepValue(event.target.value);
  };

  const handleToggleCompleteStep = () => {
    toggleCompleteStep(step.id);
  };

  const handleDeleteStep = () => {
    deleteStep(step.id);
  };

  const handleUpdateStep = () => {
    updateStep({
      id: step.id,
      content: stepValue,
    });
    handleToggleVisibleInput();
  };

  useEffect(() => {
    if (
      toggleCompleteStepIsSuccess ||
      deleteStepIsSuccess ||
      updateStepIsSuccess
    ) {
      refetchTasks();
      refetchSteps();
    }
  }, [
    toggleCompleteStepIsSuccess,
    deleteStepIsSuccess,
    updateStepIsSuccess,
    refetchTasks,
    refetchSteps,
  ]);

  useEffect(() => {
    if (step.content) {
      setStepValue(step.content);
    }
  }, [step]);

  return (
    <li key={step.id} className="border-2 mb-3 p-2 rounded-md flex">
      <Checkbox onClick={handleToggleCompleteStep} checked={step.isCompleted} />
      {!isInputVisible ? (
        <button
          onClick={handleToggleVisibleInput}
          className="block w-[150px] text-left"
        >
          <p>{step.content}</p>
        </button>
      ) : (
        <input
          type="text"
          className="border-b-2 outline-none"
          onChange={handleChangeStep}
          onBlur={handleUpdateStep}
          defaultValue={stepValue}
        />
      )}
      <button onClick={handleDeleteStep}>
        <ClearIcon />
      </button>
    </li>
  );
};
