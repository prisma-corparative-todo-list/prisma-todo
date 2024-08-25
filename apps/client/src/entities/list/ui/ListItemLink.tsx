import { PAGE_URLS } from '../../../shared/model/constants';
import { List } from 'prisma/prisma-client';
import { FC } from 'react';
import { Link } from 'react-router-dom';
interface IProps {
  list?: List;
  idx: number;
  className?: string;
  label?: string;
}

export const ListItemLink: FC<IProps> = ({ list, idx, className, label }) => {
  return (
    <li
      key={list?.id || idx}
      id={list?.id || String(idx)}
      className={`my-2 hover:bg-[#e2e3d1] w-full rounded-md ${
        // eslint-disable-next-line no-restricted-globals
        location.pathname === `/list/${list?.id}` && 'bg-[#e2e3d1]'
      }`}
    >
      <Link
        className={`block ${className} p-3 rounded-md`}
        to={`${PAGE_URLS.LIST}/${list?.id}`}
      >
        {label || list?.title ? list?.title : `no name list ${idx + 1}`}
      </Link>
    </li>
  );
};
