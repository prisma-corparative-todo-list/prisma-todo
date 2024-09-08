import { IUserWithUserRole } from 'interfaces';
import { ParticipantItem } from '../../../entities/participant';
import { FC } from 'react';


interface IProps {
  participants?: IUserWithUserRole[];
}

export const ParticipantsList: FC<IProps> = ({ participants}) => {


  return (
    <ul className="mx-5 border-2 p-2 rounded-lg h-[300px] overflow-y-auto w-[400px] mb-5">
      {participants?.map((participant) => (
        <ParticipantItem key={participant.id} participant={participant} />
      ))}
    </ul>
  );
};
