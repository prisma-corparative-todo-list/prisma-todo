import { QUERY_KEYS } from '../../model/constants';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { MessageService } from '../services/message.service';
import { ICreateMessageDto } from '../../model/types/message.types';

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
    hasNextPage,
  };
};

export const usePostMessage = () => {
  const queryClient = useQueryClient();

  const {
    mutate: postMessage,
    isSuccess: postMessageIsSuccess,
    isError: postMessageIsError,
    isPending: postMessageIsPending,
    variables: postMessageVariables,
  } = useMutation({
    mutationKey: [QUERY_KEYS.MESSAGE],
    mutationFn: async (data: Omit<ICreateMessageDto, 'userId'>) => {
      const response = await MessageService.createOne(data);
      return response;
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.MESSAGE],
      });
    },
  });

  return {
    postMessage,
    postMessageIsSuccess,
    postMessageIsError,
    postMessageIsPending,
    postMessageVariables,
  };
};
