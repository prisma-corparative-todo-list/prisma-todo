import { Drawer } from '@mui/material';
import { SidebarGroupHeader } from '../../../features/group';
import { FC } from 'react';
import { IGroupInfo } from 'interfaces';
import { Button } from '../../../shared';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenModal: () => void;
  group: IGroupInfo | undefined;
}

export const GroupSidebar: FC<IProps> = ({
  isOpen,
  onClose,
  group,
  onOpenModal,
}) => {
  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <SidebarGroupHeader group={group} />
      <Button onClick={onOpenModal} type="button" className="w-[75%] mx-auto">
        invite
      </Button>
    </Drawer>
  );
};
