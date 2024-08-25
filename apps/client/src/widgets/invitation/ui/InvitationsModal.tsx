import { FC } from 'react';
import { ModalLayout } from '../../../shared';
import { Typography } from '@mui/material';
import { InvitationsList } from '../../../features/invitation';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  refetchGroups: () => void;
}

export const InvitationsModal: FC<IProps> = ({ isOpen, onClose, refetchGroups }) => {
  return (
    <ModalLayout onClose={onClose} isOpen={isOpen}>
      <Typography variant="h5" textAlign={'center'} marginBottom={'20px'}>Invitations</Typography>
      <InvitationsList refetchGroups={refetchGroups}/>
    </ModalLayout>
  );
};
