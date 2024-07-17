import { Drawer } from '@mui/material';
import { FC, useEffect } from 'react';
import { TaskDetails } from '../../../features/task/';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteTask } from '../../../shared';
import { useParams } from 'react-router-dom';

interface IProps {
  isOpen: boolean;
  taskId: string;
  onClose: () => void;
  onToggleComplete: (taskId: string) => void;
  toggleCompleteTaskIsSuccess: boolean;
  refetch: () => void;
}

export const TaskSidebar: FC<IProps> = ({
  isOpen,
  onClose,
  onToggleComplete,
  taskId,
  toggleCompleteTaskIsSuccess,
  refetch: refetchTasks,
}) => {
  const {
    deleteTask,
    deleteTaskIsSuccess,
    deleteTaskIsError,
    deleteTaskIsLoading,
  } = useDeleteTask();


  const handleDeleteTask = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    deleteTask(taskId);
  };

  useEffect(() => {
    if (deleteTaskIsSuccess) {
      refetchTasks();
      onClose();
    }
  }, [deleteTaskIsSuccess]);

  useEffect(() => {
    console.log("mounted")
  })

  return (
    <Drawer
      open={isOpen}
      anchor="right"
      onClose={onClose}
      sx={{ minHeight: '100vh', position: 'relative' }}
    >
      <TaskDetails
        toggleCompleteTaskIsSuccess={toggleCompleteTaskIsSuccess}
        onToggleComplete={onToggleComplete}
        taskId={taskId}
        refetchTasks={refetchTasks}
        onClose={onClose}
      />
      <button onClick={handleDeleteTask} className="absolute bottom-10 right-10">
        <DeleteIcon fontSize='large' />
      </button>
    </Drawer>
  );
};
