import { FC } from 'react';
import { getWeedayMonthAndDay } from '../../../shared';

interface IProps {
  title: string;
}

export const TasksHeader: FC<IProps> = ({title}) => {
  const formattedDate = getWeedayMonthAndDay(new Date());
  return (
    <>
      <h1 className="text-3xl mb-2">{title}</h1>
      <h3 className="pb-3">{formattedDate}</h3>
    </>
  );
};
