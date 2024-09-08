import { Modal } from '@mui/material';

export const PostMessageModal = () => {
  return (
    <div>
      <Modal open={false} onClose={() => console.log('hello')}>
        <div>123</div>
      </Modal>
    </div>
  );
};
