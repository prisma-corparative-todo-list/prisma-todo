import { Group } from 'prisma/prisma-client';
import { GroupItem } from '../../../entities/group';
import { FC } from 'react';

interface IProps {
  groups?: Group[];
}

export const GroupsList: FC<IProps> = ({ groups }) => {
  return (
    <ul className="mx-auto w-[50%]">
      {groups?.map((group) => (
        <GroupItem key={group.id} group={group} />
      ))}
    </ul>
  );
};
