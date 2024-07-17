import { Box, Modal, Typography } from '@mui/material';
import { FC } from 'react';

interface IProps {
  onClose: () => void;
  isOpen: boolean;
}

export const JoinGroupModal: FC<IProps> = ({ onClose, isOpen }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          bgcolor: 'white',
          width: '30%',
          outline: 'none',
          mx: 'auto',
          mt: '10%',
          padding: '15px 15px 20px 15px',
          borderRadius: '10px',
        }}
      >
        <Typography variant="h5" textAlign={'center'}>
          Join to existing room
        </Typography>
      </Box>
    </Modal>
  );
};
