import { IEventFn } from '../../../shared';
import { ExtendedInvitation } from 'interfaces';
import { FC } from 'react';

interface IProps {
  invitation: ExtendedInvitation;
  onAcceptInvitation: ({
    groupId,
    invitationId,
  }: {
    groupId: string;
    invitationId: string;
  }) => void;
  onRejectInvitation: IEventFn<HTMLButtonElement>;
}

export const InvitationItem: FC<IProps> = ({
  invitation,
  onAcceptInvitation,
  onRejectInvitation,
}) => {
  return (
    <li className="bg-[#e2e3d1] p-2 rounded-md flex justify-between">
      <p className="text-2xl mb-2">{invitation.groupName}</p>
      <div className="flex gap-5">
        <button
          id={invitation.groupId}
          onClick={onAcceptInvitation.bind(null, {
            groupId: invitation.groupId,
            invitationId: invitation.id,
          })}
          className="border border-black px-2 rounded-md"
        >
          Accept
        </button>
        <button
          onClick={onRejectInvitation}
          id={invitation.id}
          className="border border-black px-2 rounded-md"
        >
          Reject
        </button>
      </div>
    </li>
  );
};
