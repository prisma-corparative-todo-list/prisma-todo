import { Drawer } from '@mui/material';
import { GroupLists, GroupHeaderSidebar } from '../../../features/group';
import { FC } from 'react';
import { ParticipantsList } from '../../../features/participant';
import { Group } from 'prisma/prisma-client';
import { IUserWithUserRole } from 'interfaces';
import { ParticipantsManagement } from '../../../features/participant';
import DehazeIcon from '@mui/icons-material/Dehaze';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenModal: () => void;
  group?: Group;
  participants?: IUserWithUserRole[];
}

export const GroupSidebar: FC<IProps> = ({
  isOpen,
  onClose,
  group,
  onOpenModal,
  participants,
}) => {
  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <div className="p-[25px] flex justify-between">
        <GroupHeaderSidebar group={group} />
        <ParticipantsManagement
          onOpenModal={onOpenModal}
        />
      </div>
      <ParticipantsList participants={participants} />
      <GroupLists />
    </Drawer>
  );
};
