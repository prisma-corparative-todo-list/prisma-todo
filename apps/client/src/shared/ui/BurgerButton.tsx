
import MenuIcon from '@mui/icons-material/Menu';
import { FC } from 'react';

interface IProps {
    fontSize: "inherit" | "large" | "medium" | "small";
    onClick?: (e: any) => void;
}

export const BurgerButton: FC<IProps> = ({fontSize, onClick}) => {
  return (
    <button onClick={onClick}>
      <MenuIcon fontSize={fontSize} />
    </button>
  );
};
