import {
  useToggleImportantStatus,
  useToggleCompleteTask,
  useGetTasks,
  useCreateTask,
} from '../../../shared';

export const useTask = () => {
  const {
    toggleImportantStatus,
    toggleImportantStatusIsError,
    toggleImportantStatusIsLoading,
    toggleImportantStatusIsSuccess,
  } = useToggleImportantStatus();

  const {
    toggleCompleteTask,
    toggleCompleteTaskIsSuccess,
    toggleCompleteTaskIsError,
  } = useToggleCompleteTask();

  const {
    tasks,
    tasksIsSuccess,
    tasksIsError,
    tasksIsPending,
    refetch: refetchTasks,
  } = useGetTasks();

  const { createTask, createTaskIsSuccess } = useCreateTask();

  return {
    tasks,
    tasksIsSuccess,
    tasksIsError,
    tasksIsPending,
    refetchTasks,
    toggleCompleteTask,
    toggleCompleteTaskIsSuccess,
    toggleCompleteTaskIsError,
    toggleImportantStatus,
    toggleImportantStatusIsError,
    toggleImportantStatusIsLoading,
    toggleImportantStatusIsSuccess,
    createTask,
    createTaskIsSuccess
  };
};
