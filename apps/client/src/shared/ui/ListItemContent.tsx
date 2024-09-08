import React, { FC } from 'react';

interface ListItemContentProps {
  children: React.ReactNode;
}

export const ListItemContent: FC<ListItemContentProps> = ({ children }) => {
  return <span className="text-2xl">{children}</span>;
};