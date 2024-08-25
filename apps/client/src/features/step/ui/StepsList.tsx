import { Step } from 'prisma/prisma-client';
import { StepItem } from '../../../entities/step';
import { FC, useEffect, useState } from 'react';
import { useGetSteps, usePostStep } from '../../../shared';

interface IProps {
  refetchTasks: () => void;
  taskId: string;
}

export const StepsList: FC<IProps> = ({ refetchTasks, taskId }) => {
  const { steps, refetchSteps } = useGetSteps(taskId);

  const { postStep, postStepIsSuccess } = usePostStep();

  const [stepValue, setStepValue] = useState('');

  const handlePostStep = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      postStep({
        taskId,
        content: stepValue,
      });
    }
  };

  const handleChangeStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStepValue(event.target.value);
  };

  useEffect(() => {
    if(postStepIsSuccess){
      refetchSteps();
      setStepValue('');
    }
  },[postStepIsSuccess, refetchSteps])

  return (
    <div className="mx-2 border-2 p-2 rounded-lg">
      <input
        type="text"
        className="border-b-2 outline-none w-full px-5 py-2 mb-3"
        onKeyUp={handlePostStep}
        value={stepValue}
        onChange={handleChangeStep}
        placeholder="add steps"
      />
      <ul
        className={`${
          steps && steps.length >= 3 && 'h-[250px] overflow-auto'
        } `}
      >
        {steps &&
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
  );
};
