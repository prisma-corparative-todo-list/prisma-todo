import { QUERY_KEYS } from '../../model/constants';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { MessageService } from '../services/message.service';

export const useGetExistingMessages = ({
  groupId,
  limit = 10,
}: {
  groupId?: string;
  limit?: number;
}) => {
  const {
    data: existingMessages,
    isSuccess: existingMessagesIsSuccess,
    isError: existingMessagesIsError,
    isPending: existingMessagesIsPending,
    refetch: refetchExistingMessages,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.MESSAGE, groupId, { limit }],
    queryFn: async ({ pageParam }) => {
      const response = await MessageService.findMany({
        groupId,
        limit,
        pageParam,
      });
      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      return lastPage.nextCursor;
    },
    
  });

  return {
    existingMessages,
    existingMessagesIsSuccess,
    existingMessagesIsError,
    existingMessagesIsPending,
    refetchExistingMessages,
    fetchNextPage,
    hasNextPage
  };
};
