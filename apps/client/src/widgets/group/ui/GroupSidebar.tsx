import { Drawer } from '@mui/material';
import { GroupDetails } from '../../../features/group';
import { FC } from 'react';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GroupSidebar: FC<IProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <GroupDetails/>
    </Drawer>
  );
};
