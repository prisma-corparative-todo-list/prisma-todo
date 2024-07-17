import { FC, useEffect, useState } from 'react';
import { Modal, Box, Typography } from '@mui/material/';
import { Button, InputField } from '../../../shared';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { groupFormSchema } from '../model/group.schema';
import { usePostGroup } from '../../../shared';
import { ICreateGroupInput } from '../model/group.interface';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  refetchGroups: () => void
}

export const CreateGroupModal: FC<IProps> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(groupFormSchema),
  });

  const {
    postGroup,
    postGroupIsError,
    postGroupIsPending,
    postGroupIsSuccess,
  } = usePostGroup();

  const handleCreateGroup: SubmitHandler<ICreateGroupInput> = (data) => {
    postGroup(data);
  };

  useEffect(() => {
    if (postGroupIsSuccess) {
      reset();
      onClose();
    }
  }, [postGroupIsSuccess]);

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
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          Create group
        </Typography>
        <form className="w-[50%]" onSubmit={handleSubmit(handleCreateGroup)}>
          <InputField
            register={register}
            type="text"
            placeholder="Group name"
            name="name"
            className="mb-5"
            errorMessage={errors.name?.message}
          />
          <Button type="submit">Create Group</Button>
        </form>
      </Box>
    </Modal>
  );
};
