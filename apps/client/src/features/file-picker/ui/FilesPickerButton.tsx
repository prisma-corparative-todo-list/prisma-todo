import React, { useRef } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '../../../shared';

export const FilesPickerButton = () => {
  const filesInputRef = useRef<HTMLInputElement>(null);
  const photoesInputRef = useRef<HTMLInputElement>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleOpenFilesPicker = () => {
    if (filesInputRef.current) filesInputRef.current.click();
  };

  const handleOpenPhotoesPicker = () => {
    if (photoesInputRef.current) photoesInputRef.current.click();
  };

  return (
    <>
      <button
        className="origin-center rotate-45 text-[30px]"
        onClick={handleOpenMenu}
      >
        <AttachFileIcon fontSize="inherit" />
      </button>
      <Menu
        id="demo-positioned-menu"
        anchorEl={anchorEl}
        open={open}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Button
            className="mx-auto w-[100%]"
            onClick={handleOpenFilesPicker}
            type="button"
          >
            Choose a files
          </Button>
          <input
            className="hidden"
            type="file"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.mp3,.mp4,.avi,.mkv"
            multiple
            ref={filesInputRef}
          />
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          <Button onClick={handleOpenPhotoesPicker} className="mx-auto w-[100%]" type="button">
            Choose a photoes
          </Button>
          <input
            className="hidden"
            type="file"
            accept="image/*"
            multiple
            ref={photoesInputRef}
          />
        </MenuItem>
      </Menu>
    </>
  );
};
