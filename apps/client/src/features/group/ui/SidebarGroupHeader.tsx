import { useParams } from 'react-router-dom';
import { FC } from 'react';
import { IGroupInfo } from 'interfaces';

interface IProps {
  group: IGroupInfo | undefined;
}

export const SidebarGroupHeader: FC<IProps> = ({ group }) => {
  return (
    <div className="w-[250px] p-[25px]">
      <h3 className='text-xl'>{group?.name}</h3>
      <p>{group?.description || "no description"}</p>
    </div>
  );
};
