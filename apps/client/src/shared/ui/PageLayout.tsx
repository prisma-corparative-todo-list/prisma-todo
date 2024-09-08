import { FC, PropsWithChildren } from 'react';

interface IProps {
  children: React.ReactNode;
  className?: string;
}

export const PageLayout: FC<IProps> = ({ children, className }) => {
  return (
    <div className={`p-5 h-screen basis-full ${className}`}>{children}</div>
  );
};
