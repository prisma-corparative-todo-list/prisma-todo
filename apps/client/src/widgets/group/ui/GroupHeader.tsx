import { IGroupInfo } from 'interfaces';
import { MenuButton } from '../../../shared';
import { Group } from 'prisma/prisma-client';
import { FC } from 'react';

interface IProps {
  group?: IGroupInfo;
  onToggleSidebarVisibility: () => void;
}

export const GroupHeader: FC<IProps> = ({
  group,
  onToggleSidebarVisibility,
}) => {
  return (
    <header className="bg-[#faf9f0] h-[10%] px-5 rounded-xl flex justify-between items-center">
      <div>
        <h3 className="text-3xl">{group?.name}</h3>
        <p>participants: {group?.participants.length}</p>
      </div>
      <MenuButton onClick={onToggleSidebarVisibility} />
    </header>
  );
};
