import { useListStore } from '../../../shared';
import { List } from 'prisma/prisma-client';
import { FC } from 'react';
interface IProps {
  list?: List;
  idx?: number;
  className?: string;
  label?: string;
  onToggleVisibility: () => void
}

export const ListItemButton: FC<IProps> = ({ list, idx, className, label, onToggleVisibility }) => {
  const { changeListId } = useListStore();

  const handleChangeListId = () => {
    changeListId(list?.id || '');
    onToggleVisibility();
  };

  return (
    <li
      key={list?.id || idx}
      id={list?.id || String(idx)}
      className="my-2 hover:bg-slate-100 py-2"
    >
      <button
        className={`block ${className} w-full p-2`}
        onClick={handleChangeListId}
      >
        {list?.title === undefined
          ? 'Tasks'
          : list?.title
          ? list?.title
          : `no name list ${Number(idx) + 1}`}
      </button>
    </li>
  );
};
