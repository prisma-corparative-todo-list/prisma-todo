import { useParams } from 'react-router-dom';
import { BurgerButton, Button, useGroupStore } from '../../../shared';
import { FC, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
interface IProps {
  onOpenModal: () => void;
}

export const ParticipantsManagement: FC<IProps> = ({ onOpenModal }) => {
  const { role } = useGroupStore();

  const { groupId } = useParams();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const copyText = () => {
    const textToCopy = groupId;
    if (!textToCopy) return;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert('Текст скопирован в буфер обмена!');
      })
      .catch((err) => {
        console.error('Ошибка копирования: ', err);
      });
  };

  return (
    <div>
      <BurgerButton onClick={handleClick} fontSize="large" />
      <Menu open={open} anchorEl={anchorEl} onClick={handleClose}>
        {role === 'ADMIN' && (
          <>
            <MenuItem>
              <Button
                className="text-center block mx-auto w-full"
                type={'button'}
              >
                invite person
              </Button>
            </MenuItem>
            <MenuItem>
              <Button
                className="text-center block mx-auto w-full"
                type={'button'}
              >
                requests to join
              </Button>
            </MenuItem>
          </>
        )}
        <MenuItem>
          <Button onClick={copyText} className="text-center block mx-auto w-full" type={'button'}>
            Click to copy group id
          </Button>
        </MenuItem>
      </Menu>
    </div>
  );
};
