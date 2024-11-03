import { IOptimisticStep } from '../../../shared';
import { FC } from 'react';

interface IProps {
  step: IOptimisticStep;
}

export const OptimisticStepItem: FC<IProps> = ({ step }) => {
  return <li className="border-2 mb-3 p-2 rounded-md flex">{step.content}</li>;
};
