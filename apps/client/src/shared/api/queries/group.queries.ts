import { ICreateGroup } from 'interfaces';
import { QUERY_KEYS } from '../../model/constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import { GroupService } from '../services/group.service';

export const usePostGroup = () => {
  const {
    mutate: postGroup,
    isSuccess: postGroupIsSuccess,
    isPending: postGroupIsPending,
    isError: postGroupIsError,
  } = useMutation({
    mutationKey: [QUERY_KEYS.GROUP],
    mutationFn: async (data: ICreateGroup) => {
      
      const response = await GroupService.create(data);
      return response;
    },
  });
  return {
    postGroup,
    postGroupIsSuccess,
    postGroupIsPending,
    postGroupIsError,
  };
};

export const useGetGroups = () => {
  const {
    isPending: groupsIsPending,
    isSuccess: groupsIsSuccess,
    isError: groupsIsError,
    data: groups,
    refetch: refetchGroups,
  } = useQuery({
    queryKey: [QUERY_KEYS.GROUP],
    queryFn: async () => {
      const response = await GroupService.findMany();
      return response;
    },
  });
  return { groupsIsError, groupsIsSuccess, groupsIsPending, groups, refetchGroups };
};

export const useGetGroup = (id?: string) => {
  const {
    data: group,
    isError: groupIsError,
    isSuccess: groupIsSuccess,
    isPending: groupIsPending,
  } = useQuery({
    queryKey: [QUERY_KEYS.GROUP, id],
    queryFn: async () => {
      const response = await GroupService.findOne(id);
      return response;
    },
    enabled: id === undefined ? false : true,
  });
  return { groupIsError, groupIsSuccess, groupIsPending, group };
};
