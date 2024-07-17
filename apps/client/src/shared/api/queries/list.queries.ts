import { ICreateList } from 'interfaces';
import { QUERY_KEYS } from '../../model/constants';
import { ListService } from '../services/list.service';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetLists = () => {
  const {
    data: lists,
    isSuccess: listsIsSuccess,
    isError: listsIsError,
    isPending: listsIsPending,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEYS.LIST],
    queryFn: async () => {
      const response = await ListService.findMany();
      return response;
    },
  });

  return {
    lists,
    listsIsSuccess,
    listsIsError,
    listsIsPending,
    refetch,
  };
};

export const usePostList = () => {
  const {
    data: list,
    isSuccess: postListIsSuccess,
    isError: postListIsError,
    isPending: postListIsPending,
    mutate: postList,
  } = useMutation({
    mutationKey: [QUERY_KEYS.LIST],
    mutationFn: async (data: ICreateList) => {
      const response = await ListService.create(data);
      return response;
    },
  });
  return {
    list,
    postListIsSuccess,
    postListIsError,
    postListIsPending,
    postList,
  };
};

export const useGetList = (id?: string) => {
  const {
    data: list,
    isSuccess: listIsSuccess,
    isError: listIsError,
    isPending: listIsPending,
    refetch: refetchList,
  } = useQuery({
    queryKey: [QUERY_KEYS.LIST, id],
    queryFn: async () => {
      const response = await ListService.findOne(id);
      return response;
    },
    enabled: id === undefined ? false : true,
  });

  return {
    list,
    listIsSuccess,
    listIsError,
    listIsPending,
    refetchList,
  };
};

export const useDeleteList = () => {
  const {
    isSuccess: deleteListIsSuccess,
    isError: deleteListIsError,
    isPending: deleteListIsPending,
    mutate: deleteList,
  } = useMutation({
    mutationKey: [QUERY_KEYS.LIST],
    mutationFn: async (id: string) => {
      const response = await ListService.deleteOne(id);
      return response;
    },
  });
  return {
    deleteList,
    deleteListIsSuccess,
    deleteListIsError,
    deleteListIsPending,
  };
};

export const useUpdateList = (id?: string) => {
  const { isSuccess: updateListIsSuccess, mutate: updateList } = useMutation({
    mutationKey: [QUERY_KEYS.LIST, id],
    mutationFn: async ({ title, id }: { title: string; id?: string }) => {
      const response = await ListService.updateOne(title, id);
      return response;
    },
  });

  return {
    updateList,
    updateListIsSuccess,
  };
};
