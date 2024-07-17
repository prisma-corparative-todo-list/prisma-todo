import { List } from 'prisma/prisma-client';
import { FC } from 'react';
interface IProps {
  list?: List;
  idx: number;
  className?: string
  label?: string;
}

export const ListItemButton: FC<IProps> = ({ list, idx, className, label }) => {
  return (
    <li key={list?.id || idx} id={list?.id || String(idx)} className="mb-3">
      <button
        className={`block ${className} w-full p-5`}
      >
        {label || list?.title ? list?.title : `no name list ${idx + 1}`}
      </button>
    </li>
  );
};