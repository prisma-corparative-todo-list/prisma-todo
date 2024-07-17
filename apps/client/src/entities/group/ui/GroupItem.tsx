import { PAGE_URLS } from '../../../shared/model/constants';
import { Group } from 'prisma/prisma-client';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  group: Group;
}

export const GroupItem: FC<IProps> = ({ group }) => {
  return (
    <li className="mb-5 border-[#292828] border-2 p-2 rounded-md">
      <Link  to={`${PAGE_URLS.GROUPS}/${group.id}`} className="text-xl">
        {group.name}
      </Link>
    </li>
  );
};
