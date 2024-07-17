import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export function InputFileUpload({
  register,
  onChangePhoto,
  label
}: {
  register?: any;
  onChangePhoto: (e: any) => void;
  label: string
}) {
  return (
    <div className='mx-auto'>
      <Button
        component="label"
        role={undefined}
        variant="outlined"  
        className='text-center'      
        sx={{ border: '1px solid black', color: "black", }}

      >
        {label}
        <VisuallyHiddenInput
          {...register('photo')}
          onChange={onChangePhoto}
          type="file"
          accept='image/*'
          
        />
      </Button>
    </div>
  );
}
