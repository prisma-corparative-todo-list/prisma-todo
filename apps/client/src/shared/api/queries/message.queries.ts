import { QUERY_KEYS } from '../../model/constants';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { MessageService } from '../services/message.service';

export const useGetExistingMessages = ({
  groupId,
  limit = 10,
  page = 1,
}: {
  groupId?: string;
  limit?: number;
  page?: number;
}) => {
  const {
    data: existingMessages,
    isSuccess: existingMessagesIsSuccess,
    isError: existingMessagesIsError,
    isPending: existingMessagesIsPending,
    refetch: refetchExistingMessages,
    fetchNextPage
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.MESSAGE, groupId, { limit, page }],
    queryFn: async () => {
      const response = await MessageService.findMany({ groupId, limit, page });
      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined
      }
      return lastPageParam + 1
    },
    getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined
      }
      return firstPageParam - 1
    },
  });

  return {
    existingMessages,
    existingMessagesIsSuccess,
    existingMessagesIsError,
    existingMessagesIsPending,
    refetchExistingMessages,
    fetchNextPage
  };
};
