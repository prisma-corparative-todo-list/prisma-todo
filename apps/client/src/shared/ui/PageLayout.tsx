import { FC, PropsWithChildren } from 'react';

export const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  return <div className="p-5 h-screen basis-full">{children}</div>;
};
