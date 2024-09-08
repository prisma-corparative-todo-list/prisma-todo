import { MenuButton } from '../../../shared';
import { User } from 'prisma/prisma-client';
import { FC } from 'react';

interface IProps {
  groupName?: string
  onToggleSidebarVisibility: () => void;
  participants?: User[]
}

export const GroupHeader: FC<IProps> = ({
  groupName,
  onToggleSidebarVisibility,
  participants
}) => {
  return (
    <header className="bg-[#faf9f0] h-[10%] px-5 rounded-xl flex justify-between items-center">
      <div>
        <h3 className="text-3xl">{groupName}</h3>
        <p>participants: {participants?.length}</p>
      </div>
      <MenuButton onClick={onToggleSidebarVisibility} />
    </header>
  );
};
