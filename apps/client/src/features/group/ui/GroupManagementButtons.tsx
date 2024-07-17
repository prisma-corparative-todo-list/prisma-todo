import { FC } from 'react';
import { Button } from '../../../shared';

interface IProps {
  onToggleCreateGroupModalVisibility: () => void;
  onToggleJoinGroupModalVisibility: () => void;
}

export const GroupManagementButtons: FC<IProps> = ({
  onToggleCreateGroupModalVisibility,
  onToggleJoinGroupModalVisibility

}) => {
  return (
    <div className="absolute right-[55px] bottom-[45px]">
      <Button
        className="block mb-2 w-[150px]"
        onClick={onToggleJoinGroupModalVisibility}
        type="button"
      >
        Join to Group
      </Button>
      <Button
        className="block w-[150px]"
        onClick={onToggleCreateGroupModalVisibility}
        type="button"
      >
        Create Group
      </Button>
    </div>
  );
};
