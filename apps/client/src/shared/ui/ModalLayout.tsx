import { Box, Modal } from '@mui/material';
import { FC, PropsWithChildren, ReactNode } from 'react';

interface IProps {
    children: ReactNode
    isOpen: boolean
    onClose: () => void
    className?: string
}


export const ModalLayout: FC<IProps> = ({ children, isOpen, onClose }) => {
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
        {children}
      </Box>
    </Modal>
  );
};
