import { Group } from 'prisma/prisma-client';
import { GroupItem } from '../../../entities/group';
import { FC } from 'react';

interface IProps {
  groups?: Group[];
}

export const GroupsList: FC<IProps> = ({ groups }) => {
  return (
    <ul className="mx-auto mt-[75px] w-[50%] h-[500px] px-5 overflow-y-auto">
      {groups?.map((group) => (
        <GroupItem key={group.id} group={group} />
      ))}
    </ul>
  );
};
