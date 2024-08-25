import { Drawer } from '@mui/material';
import { FC, useEffect } from 'react';
import { DeleteTaskButton, TaskDetails } from '../../../features/task/';
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
  return (
    <Drawer
      open={isOpen}
      anchor="right"
      onClose={onClose}
      sx={{ minHeight: '100vh', position: 'relative' }}
    >
      <TaskDetails
        onToggleComplete={onToggleComplete}
        taskId={taskId}
        toggleCompleteTaskIsSuccess={completeTaskIsSuccess}
        refetchTasks={refetchTasks}
      />
      <StepsList taskId={taskId} refetchTasks={refetchTasks} />
      <DeleteTaskButton
        className="absolute bottom-10 right-10"
        fontSize="large"
        refetchTasks={refetchTasks}
        onClose={onClose}
        taskId={taskId}
      />
    </Drawer>
  );
};
