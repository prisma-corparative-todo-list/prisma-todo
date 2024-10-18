import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS, SERVICE_URL } from '../../model/constants';
import { TaskService } from '../services/task.service';
import { Prisma, Task } from 'prisma/prisma-client';
import { ICreateTask } from 'interfaces';

export const useGetTasks = ({
  isImportant,
  deadline,
  isPlanned,
  id,
  isToday,
}: {
  isImportant?: boolean;
  deadline?: Date;
  isPlanned?: boolean;
  id?: string;
  isToday?: boolean;
} = {}) => {
  const {
    data: tasks,
    isSuccess: tasksIsSuccess,
    isError: tasksIsError,
    isPending: tasksIsPending,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEYS.TASK, id, { deadline, isImportant, isPlanned }],
    queryFn: async () => {
      const response = await TaskService.findMany({
        deadline,
        isImportant,
        isPlanned,
        id,
        isToday,
      });
      return response;
    },
  });

  return {
    tasks,
    tasksIsSuccess,
    tasksIsError,
    tasksIsPending,
    refetch,
  };
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const {
    mutate: createTask,
    isPending: createTaskIsLoading,
    isError: createTaskIsError,
    isSuccess: createTaskIsSuccess,
    submittedAt: createTaskSubmittedAt,
    variables: createTaskVariables,
  } = useMutation({
    mutationKey: [SERVICE_URL.TASK],
    mutationFn: async (dto: ICreateTask) => {
      console.log('post: ', dto);
      const response = await TaskService.create(dto);
      return response;
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [SERVICE_URL.TASK] }),
  });
  return {
    createTask,
    createTaskIsLoading,
    createTaskIsError,
    createTaskIsSuccess,
  };
};

export const useToggleImportantStatus = () => {
  const queryClient = useQueryClient();

  const {
    mutate: toggleImportantStatus,
    isPending: toggleImportantStatusIsLoading,
    isError: toggleImportantStatusIsError,
    isSuccess: toggleImportantStatusIsSuccess,
  } = useMutation({
    mutationFn: async (id?: string) => {
      const response = await TaskService.toggleImportantStatus(id);
      return response;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries();
    },
  });
  return {
    toggleImportantStatus,
    toggleImportantStatusIsLoading,
    toggleImportantStatusIsError,
    toggleImportantStatusIsSuccess,
  };
};

export const useGetTask = (id?: string) => {
  const {
    data: task,
    isSuccess: taskIsSuccess,
    isError: taskIsError,
    isPending: taskIsPending,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEYS.TASK, id],
    queryFn: async () => {
      const response = await TaskService.findOne(id);
      return response;
    },
  });
  return {
    task,
    taskIsSuccess,
    taskIsError,
    taskIsPending,
    refetch,
  };
};

export const useToggleCompleteTask = () => {
  const {
    mutate: toggleCompleteTask,
    isPending: toggleCompleteTaskIsLoading,
    isError: toggleCompleteTaskIsError,
    isSuccess: toggleCompleteTaskIsSuccess,
  } = useMutation({
    mutationFn: async (id?: string) => {
      const response = await TaskService.toggleCompleteTask(id);
      return response;
    },
  });
  return {
    toggleCompleteTask,
    toggleCompleteTaskIsLoading,
    toggleCompleteTaskIsError,
    toggleCompleteTaskIsSuccess,
  };
};

export const useUpdateTask = (id?: string) => {
  const {
    mutate: updateTask,
    isPending: updateTaskIsLoading,
    isError: updateTaskIsError,
    isSuccess: updateTaskIsSuccess,
  } = useMutation({
    mutationFn: async (dto: Prisma.TaskUpdateInput) => {
      const response = await TaskService.updateOne(dto, id);
      return response;
    },
  });
  return {
    updateTask,
    updateTaskIsLoading,
    updateTaskIsError,
    updateTaskIsSuccess,
  };
};

export const useDeleteTask = () => {
  const {
    mutate: deleteTask,
    isPending: deleteTaskIsLoading,
    isError: deleteTaskIsError,
    isSuccess: deleteTaskIsSuccess,
  } = useMutation({
    mutationFn: async (id?: string) => {
      const response = await TaskService.deleteOne(id);
      return response;
    },
  });
  return {
    deleteTask,
    deleteTaskIsLoading,
    deleteTaskIsError,
    deleteTaskIsSuccess,
  };
};

export const useGetUserListTasks = (id?: string) => {
  const {
    data: tasks,
    isSuccess: tasksIsSuccess,
    isError: tasksIsError,
    isPending: tasksIsPending,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEYS.TASK, id],
    queryFn: async () => {
      const response = await TaskService.findUserListTasks(id);
      return response;
    },
    enabled: id === undefined ? false : true,
  });
  return {
    tasks,
    tasksIsSuccess,
    tasksIsError,
    tasksIsPending,
    refetch,
  };
};
