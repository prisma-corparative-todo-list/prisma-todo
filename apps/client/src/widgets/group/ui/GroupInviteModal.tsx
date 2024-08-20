import { Box, Modal } from '@mui/material';
import { InputField, Button, usePostInvitation } from '../../../shared';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { invitationFormSchema } from '../model/invitation.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { IInvitationInput } from '../model/invitation.interface';
import { useParams } from 'react-router-dom';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GroupInviteModal: FC<IProps> = ({ isOpen, onClose }) => {
  const { groupId } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(invitationFormSchema),
  });

  const {
    postInvitation,
    postInvitationIsError,
    postInvitationIsSuccess,
    postInvitationResult,
  } = usePostInvitation();

  const onSubmit = (data: IInvitationInput) =>
    postInvitation({ ...data, groupId });

  useEffect(() => {
    if (postInvitationIsSuccess || postInvitationIsError) {
    console.log(postInvitationResult)
      reset();
    }
  }, [postInvitationIsError, postInvitationIsSuccess, reset]);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        className={
          'p-5 bg-white w-[40%] mt-[10%] mx-auto rounded-lg border-[5px] border-black'
        }
      >
        <h3 className="text-center text-3xl">Invite user</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            errorMessage={errors.email?.message}
            register={register}
            type={'text'}
            name={'email'}
            placeholder={'user email'}
            className="w-[65%] block mb-5"
          />
          <Button type="submit">Submit</Button>
        </form>
      </Box>
    </Modal>
  );
};
