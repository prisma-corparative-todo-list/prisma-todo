import { Box, Modal } from '@mui/material';
import { FC } from 'react';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  isSuccess?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  message: string;
}

export const ReponseMessageModal: FC<IProps> = ({
  isOpen,
  onClose,
  isSuccess,
  isLoading,
  isError,
  message       
}) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className={'p-5 bg-white w-[40%] mt-[10%] mx-auto rounded-lg text-center border-[5px] border-black'}>
        <p className='text-2xl'>
          {message || "lorem ipsum"} 
        </p>
      </Box>
    </Modal>
  );
};
