import { PAGE_URLS } from '../../../shared/model/constants';
import { List } from 'prisma/prisma-client';
import { FC } from 'react';
import { Link } from 'react-router-dom';
interface IProps {
  list?: List;
  idx: number;
  className?: string
  label?: string;
}

export const ListItemLink: FC<IProps> = ({ list, idx, className, label }) => {
  return (
    <li key={list?.id || idx} id={list?.id || String(idx)} className="mb-3">
      <Link
        className={`block ${className} w-ful p-5`}
        to={`${PAGE_URLS.LIST}/${list?.id}`}
      >
        {label || list?.title ? list?.title : `no name list ${idx + 1}`}
      </Link>
    </li>
  );
};
