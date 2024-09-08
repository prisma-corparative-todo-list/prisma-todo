import { FC, useEffect } from 'react';
import { useUpdateTask } from '../../..//shared';
import LightModeIcon from '@mui/icons-material/LightMode';

interface IProps {
  isToday: boolean | null | undefined;
  refetchTasks: () => void;
  refetchTask: () => void;
  taskId: string;
}

export const ToggleTodayTask: FC<IProps> = ({
  isToday,
  refetchTasks,
  taskId,
  refetchTask,
}) => {
  const { updateTask, updateTaskIsSuccess } = useUpdateTask(taskId);

  useEffect(() => {
    if (updateTaskIsSuccess) {
      refetchTasks();
      refetchTask();
    }
  }, [updateTaskIsSuccess, refetchTasks, refetchTask]);

  const handleToggleToday = () => {
    updateTask({ isToday: !isToday });
  };

  return (
    <button
      className="border-2 mx-2 rounded-lg p-2 mb-2"
      onClick={handleToggleToday}
    >
 
        {isToday ? 'remove from my day' : 'add to my my day'}
      
    </button>
  );
};
