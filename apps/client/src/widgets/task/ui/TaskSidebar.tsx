import { Drawer } from '@mui/material';
import { FC, useEffect } from 'react';
import { TaskDetails } from '../../../features/task/';
import { useDeleteTask } from '../../../shared';
import { StepsList } from '../../../features/step';

interface IProps {
  isOpen: boolean;
  taskId: string;
  onClose: () => void;
  onToggleComplete: (taskId: string) => void;
  completeTaskIsSuccess: boolean;
  refetch: () => void;
}

export const TaskSidebar: FC<IProps> = ({
  isOpen,
  onClose,
  onToggleComplete,
  taskId,
  completeTaskIsSuccess,
  refetch: refetchTasks,
}) => {
  const { deleteTask, deleteTaskIsSuccess } = useDeleteTask();

  const handleDeleteTask = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    deleteTask(taskId);
  };

  useEffect(() => {
    if (deleteTaskIsSuccess) {
      refetchTasks();
      onClose();
    }
  }, [deleteTaskIsSuccess, onClose, refetchTasks]);



  return (
    <Drawer
      open={isOpen}
      anchor="right"
      onClose={onClose}
      sx={{ minHeight: '100vh', position: 'relative'}}
    >
      <TaskDetails
        onToggleComplete={onToggleComplete}
        taskId={taskId}
        toggleCompleteTaskIsSuccess={completeTaskIsSuccess}
        refetchTasks={refetchTasks}
      />
      <StepsList taskId={taskId} refetchTasks={refetchTasks} />
    </Drawer>
  );
};
