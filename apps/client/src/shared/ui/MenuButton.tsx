import { FC } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

interface IProps {
  onClick: () => void;
  className?: string;
}

export const MenuButton: FC<IProps> = ({ onClick, className }) => (
  <button className={`${className}`}>
    <MenuIcon fontSize="large" onClick={onClick} />
  </button>
);
