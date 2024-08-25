import {
  Button,
  useAcceptInvitation,
  useGetInvitations,
  useRejectInvitation,
} from '../../../shared';
import type { IEventClick } from '../../../shared';
import { InvitationItem } from '../../../entities/invitation';
import { FC, useEffect } from 'react';

interface IProps {
  refetchGroups: () => void;
}

export const InvitationsList: FC<IProps> = ({ refetchGroups }) => {
  const {
    invitations,
    fetchNextInvitationsPage,
    hasNextPage,
    refetchInvitations,
  } = useGetInvitations();

  const { acceptInvitation, acceptInvitationIsSuccess } = useAcceptInvitation();

  const { rejectInvitation, rejectInvitationIsSuccess } = useRejectInvitation();

  const handleAcceptInvitation = (data: {
    groupId: string;
    invitationId: string;
  }) => {
    acceptInvitation(data);
  };

  const handleRejectInvitation = (e: IEventClick<HTMLButtonElement>) => {
    rejectInvitation(e.currentTarget.id);
  };

  useEffect(() => {
    if (rejectInvitationIsSuccess) {
      refetchInvitations();
    }

    if (acceptInvitationIsSuccess) {
      refetchGroups();
      refetchInvitations();
    }
  }, [acceptInvitationIsSuccess, rejectInvitationIsSuccess]);

  return (
    <>
      <ul className="h-[300px] relative">
        {invitations?.pages.map((page) =>
          page.data.map((invitation) => (
            <InvitationItem
              key={invitation.id}
              invitation={invitation}
              onAcceptInvitation={handleAcceptInvitation}
              onRejectInvitation={handleRejectInvitation}
            />
          ))
        )}

        {invitations?.pages.length === 0 && <li>No invitations</li>}
      </ul>
      {hasNextPage && (
        <Button
          onClick={() => fetchNextInvitationsPage()}
          className="block mx-auto"
          type="button"
        >
          Load more
        </Button>
      )}
    </>
  );
};
