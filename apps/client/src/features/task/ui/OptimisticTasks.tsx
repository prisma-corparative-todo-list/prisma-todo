import { useMutationState } from '@tanstack/react-query';
import { SERVICE_URL } from '../../../shared/';
import { OptimisticTaskItem, TaskItem } from '../../../entities/task';
import { ExtendedTask, ICreateTask } from 'interfaces';

export const OptimisticTasks = () => {
  const variables = useMutationState<ExtendedTask>({
    filters: { mutationKey: [`${SERVICE_URL.TASK}`], status: 'pending' },
    select: (mutation) => mutation.state.variables,
  });

  const variablesIsError = useMutationState<ExtendedTask>({
    filters: { mutationKey: [`${SERVICE_URL.TASK}`], status: 'error' },
    select: (mutation) => mutation.state.variables,
  });

  console.log(variables);

  return (
    <>
      {variables.map((task) => (
        <OptimisticTaskItem key={task.id} task={task} />
      ))}
    </>
  );
};
