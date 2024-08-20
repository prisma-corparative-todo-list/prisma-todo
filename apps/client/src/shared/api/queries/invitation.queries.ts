import { useMutation, useQuery } from '@tanstack/react-query';
import { InvitationService } from '../services/invitation.service';
import { QUERY_KEYS } from '../../model/constants';
import { ICreateInvitation } from 'interfaces';

export const useGetInvitations = () => {
  const {
    data: invitations,
    isSuccess: invitationsIsSuccess,
    isError: invitationsIsError,
    isLoading: invitationsIsLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.INVITATION],
    queryFn: async () => {
      return await InvitationService.findMany();
    },
  });
  return {
    invitations,
    invitationsIsSuccess,
    invitationsIsError,
    invitationsIsLoading,
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
    postInvitationResult
  };
};
