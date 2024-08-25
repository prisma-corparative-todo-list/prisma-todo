import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FC, useState } from 'react';

interface IProps {
    anchorEl: null | HTMLElement;
    open: boolean;
    handleClose: () => void;
}

export const ProfileMenu: FC<IProps> = ({open, anchorEl, handleClose}) => {

  return (
    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
      <MenuItem>Profile</MenuItem>
      <MenuItem>Logout</MenuItem>
    </Menu>
  );
};
