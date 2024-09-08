import { Drawer } from '@mui/material';
import { FC } from 'react';
import { DeleteTaskButton, TaskDetails } from '../../../features/task/';
import { StepsList } from '../../../features/step';
import { ToggleTodayTask } from '../../../features/toggle-today-task';
import { useGetTask, useGroupStore } from '../../../shared';

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
  const { task, taskIsSuccess, refetch: refetchTask } = useGetTask(taskId);



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
        title={task?.title || ''}
        description={task?.description || ''}
        taskIsSuccess={taskIsSuccess}
        refetchTask={refetchTask}
        isCompleted={task?.isCompleted || false}
      />
      <ToggleTodayTask
        refetchTask={refetchTask}
        taskId={taskId}
        refetchTasks={refetchTasks}
        isToday={task?.isToday}
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
