import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteTask } from '../../../shared';
import { FC, useEffect } from 'react';

interface IProps {
  className?: string;
  fontSize?: 'inherit' | 'large' | 'medium' | 'small';
  taskId: string;
  refetchTasks: () => void;
  onClose: () => void;
}

export const DeleteTaskButton: FC<IProps> = ({
  className,
  fontSize,
  taskId,
  refetchTasks,
  onClose
}) => {
  const { deleteTask, deleteTaskIsSuccess } = useDeleteTask();

  useEffect(() => {
    if (deleteTaskIsSuccess) {
      refetchTasks();
      onClose();
    }
  }, [deleteTaskIsSuccess, onClose, refetchTasks]);

  const handleDeleteTask = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    deleteTask(taskId);
  };
  return (
    <button onClick={handleDeleteTask} className={`${className}`}>
      <DeleteIcon fontSize={fontSize} />
    </button>
  );
};
