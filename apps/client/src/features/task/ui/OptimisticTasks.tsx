import { useMutationState } from '@tanstack/react-query';
import { SERVICE_URL } from '../../../shared/';
import { OptimisticTaskItem, TaskItem } from '../../../entities/task';
import { ExtendedTask, ICreateTask } from 'interfaces';

export const OptimisticTasks = () => {
  const pendingTasks = useMutationState<ExtendedTask>({
    filters: { mutationKey: [`${SERVICE_URL.TASK}`], status: 'pending' },
    select: (mutation) => mutation.state.variables,
  });

  // TODO

  const tasksIsError = useMutationState<ExtendedTask>({
    filters: { mutationKey: [`${SERVICE_URL.TASK}`], status: 'error' },
    select: (mutation) => mutation.state.variables,
  });


  return (
    <>
      {pendingTasks.map((task) => (
        <OptimisticTaskItem key={task.id} task={task} />
      ))}
    </>
  );
};
