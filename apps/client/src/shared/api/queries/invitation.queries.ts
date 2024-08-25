import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { InvitationService } from '../services/invitation.service';
import { QUERY_KEYS } from '../../model/constants';
import { ICreateInvitation } from 'interfaces';

export const useGetInvitations = () => {
  const {
    data: invitations,
    isSuccess: invitationsIsSuccess,
    isError: invitationsIsError,
    isLoading: invitationsIsLoading,
    fetchNextPage: fetchNextInvitationsPage,
    refetch: refetchInvitations,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.INVITATION],
    queryFn: async ({ pageParam = 0 }) => {
      return await InvitationService.findMany({ cursor: pageParam, limit: 5 });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      return lastPage.nextCursor;
    },
  });
  return {
    invitations,
    invitationsIsSuccess,
    invitationsIsError,
    invitationsIsLoading,
    fetchNextInvitationsPage,
    hasNextPage,
    refetchInvitations,
  };
};

export const usePostInvitation = () => {
  const {
    mutate: postInvitation,
    isSuccess: postInvitationIsSuccess,
    isError: postInvitationIsError,
    data: postInvitationResult,
  } = useMutation({
    mutationKey: [QUERY_KEYS.INVITATION],
    mutationFn: async (data: ICreateInvitation) => {
      return await InvitationService.createOne(data);
    },
  });
  return {
    postInvitation,
    postInvitationIsSuccess,
    postInvitationIsError,
    postInvitationResult,
  };
};

export const useAcceptInvitation = () => {
  const { mutate: acceptInvitation, isSuccess: acceptInvitationIsSuccess } =
    useMutation({
      mutationKey: [QUERY_KEYS.INVITATION],
      mutationFn: async ({
        groupId,
        invitationId,
      }: {
        groupId: string;
        invitationId: string;
      }) => {
        return await InvitationService.accept({ groupId, invitationId });
      },
    });
  return {
    acceptInvitation,
    acceptInvitationIsSuccess,
  };
};

export const useRejectInvitation = () => {
  const { mutate: rejectInvitation, isSuccess: rejectInvitationIsSuccess } =
    useMutation({
      mutationKey: [QUERY_KEYS.INVITATION],
      mutationFn: async (invitationId: string) => {
        return await InvitationService.reject(invitationId);
      },
    });
  return {
    rejectInvitation,
    rejectInvitationIsSuccess,
  };
};
