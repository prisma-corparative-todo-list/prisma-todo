import { useMutationState } from '@tanstack/react-query';
import { SERVICE_URL } from '../../../shared/';
import { OptimisticTaskItem } from '../../../entities/task';
import { ExtendedTask } from 'interfaces';

export const OptimisticTasks = () => {
  const pendingTasks = useMutationState<ExtendedTask>({
    filters: { mutationKey: [`${SERVICE_URL.TASK}`], status: 'pending' },
    select: (mutation) => mutation.state.variables as ExtendedTask,
  });

  // TODO

  const tasksIsError = useMutationState<ExtendedTask>({
    filters: { mutationKey: [`${SERVICE_URL.TASK}`], status: 'error' },
    select: (mutation) => mutation.state.variables as ExtendedTask,
  });

  return (
    <>
      {pendingTasks.map((task, idx) => (
        <OptimisticTaskItem key={idx} task={task} />
      ))}
    </>
  );
};
