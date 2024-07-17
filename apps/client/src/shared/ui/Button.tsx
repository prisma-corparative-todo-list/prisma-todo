import { FC, ReactNode } from 'react';

interface IProps {
  onClick?: () => void;
  className?: string;
  children: ReactNode;
  type: 'button' | 'submit';
}

export const Button: FC<IProps> = ({ onClick, className, children, type }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-[#292828] text-[#ffff] font-bold py-2 px-4 rounded ${className}`}
    >
      {children}
    </button>
  );
};
