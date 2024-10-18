import { FC } from 'react';
import { ICreateMessageDto } from '../../../shared';
import ErrorIcon from '@mui/icons-material/Error';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
interface IProps {
  postMessageIsSuccess: boolean;
  postMessageIsError: boolean;
  postMessageIsPending: boolean;
  postMessageVariables: Omit<ICreateMessageDto, 'userId'> | undefined;
}

export const OptimisticMesssageItem: FC<IProps> = ({
  postMessageVariables,
  postMessageIsSuccess,
  postMessageIsError,
  postMessageIsPending,
}) => {
  return (
    <li
      className={`bg-[white] break-all mb-5 p-2 rounded-lg w-[40%] flex justify-between items-end min-h-[80px] ml-auto mr-5 `}
    >
      <p className="mt-auto ">{postMessageVariables?.text}</p>
      {postMessageIsError && <ErrorIcon />}
      {postMessageIsPending && <HourglassBottomIcon />}
    </li>
  );
};
