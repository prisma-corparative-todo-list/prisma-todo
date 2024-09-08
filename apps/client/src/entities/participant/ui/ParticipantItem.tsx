import { useUserStore } from '../../../shared';
import { IUserWithUserRole } from 'interfaces';
import { FC } from 'react';

interface IProps {
  participant?: IUserWithUserRole;
}

export const ParticipantItem: FC<IProps> = ({ participant }) => {
  const { user } = useUserStore();

  return (
    <li className="p-2 border-2 rounded-lg mb-2 flex justify-between items-top">
      <div className="flex gap-2 items-center">
        <img
          className="h-[50px] w-[50px] rounded-full"
          src="https://i.pravatar.cc"
          alt=""
        />
        <span>{participant?.userName}</span>
      </div>
      <p className="mr-5">
        {participant?.id === user?.id
          ? 'You'
          : participant?.role === 'ADMIN' && 'Admin'}
      </p>
    </li>
  );
};
