import { FC } from 'react';
import { Group } from 'prisma/prisma-client';

interface IProps {
  group: Group | undefined;
}

export const GroupHeaderSidebar: FC<IProps> = ({ group }) => {
  return (
    
      <div className="w-[250px] h-[150px] overflow-y-auto">
        <h3 className="text-xl">{group?.name}</h3>
        <p>{group?.description || 'no description'}</p>
      </div>
    
  );
};
