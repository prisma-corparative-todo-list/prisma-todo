import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../model/constants';
import { TaskService } from '../services/task.service';

export const useGetTasks = ({}) => {
  const {
    data: user,
    isSuccess: userIsSuccess,
    isError: userIsError,
    isPending: userIsPending,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEYS.USER],    
    queryFn: async () => {
      const response = await TaskService
      return response;
    },
  });
};
