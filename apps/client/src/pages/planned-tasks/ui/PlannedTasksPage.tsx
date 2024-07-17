import { useEffect, useState } from 'react';
import { TasksList, AddTaskPanel, TaskSidebar } from '../../../widgets/task';
import {
  getWeedayMonthAndDay,
  useCreateTask,
  useGetTasks,
  useToggleCompleteTask,
  useToggleImportantStatus,
} from '../../../shared';

export const PlannedTasksPage = () => {
  const [taskId, setTaskId] = useState('');

  const [isTaskSidebarVisible, setIsTaskSidebarVisible] = useState(false);

  const [date, setDate] = useState<Date | null>(
    new Date(new Date(Date.now()).toDateString())
  );

  const {
    tasks,
    tasksIsSuccess,
    tasksIsError,
    tasksIsPending,
    refetch: refetchTasks,
  } = useGetTasks({ isPlanned: true });

  const formattedDate = getWeedayMonthAndDay(new Date());

  const {
    toggleCompleteTask,
    toggleCompleteTaskIsSuccess,
    toggleCompleteTaskIsError,
  } = useToggleCompleteTask();

  const {
    toggleImportantStatus,
    toggleImportantStatusIsError,
    toggleImportantStatusIsLoading,
    toggleImportantStatusIsSuccess,
  } = useToggleImportantStatus();

  const { createTask, createTaskIsSuccess } = useCreateTask();

  const handleCreateTask = (payload: {
    title: string;
    listId?: string;
    deadLine: Date | null;
  }) => {
    createTask(payload);
  };

  const handleToggleImportant = (taskId: string) => {
    toggleImportantStatus(taskId);
  };

  const handleToggleComplete = (taskId: string) => {
    toggleCompleteTask(taskId);
  };

  const handleOpenSidebar = (e: any) => {
    setTaskId(e.target.closest('li')?.id);
    setIsTaskSidebarVisible(true);
  };

  const handleChangeDate = (e: any) => {
    setDate(
      new Date(new Date(e.target?.closest('button').id || e?.$d).toDateString())
    );
  };

  const handleCloseSidebar = () => setIsTaskSidebarVisible(false);

  useEffect(() => {
    if (toggleCompleteTaskIsSuccess || toggleImportantStatusIsSuccess) {
      refetchTasks();
    }
  }, [toggleCompleteTaskIsSuccess, toggleImportantStatusIsSuccess]);

  return (
    <div className="flex">
      <div className="p-5 h-screen basis-full">
        <h1 className="text-3xl mb-2">Planned Tasks</h1>
        <h3 className="pb-3">{formattedDate}</h3>
        <TasksList
          onToggleImportantStatus={handleToggleImportant}
          onToggleComplete={handleToggleComplete}
          onOpenTaskSidebar={handleOpenSidebar}
          tasks={tasks || []}
          date={date}
        />
        <AddTaskPanel
          onAddTask={handleCreateTask}
          createTaskIsSuccess={createTaskIsSuccess}
          refreshTasks={refetchTasks}
          date={date}
          onChangeDate={handleChangeDate}
        />
        <TaskSidebar
          onToggleComplete={handleToggleComplete}
          toggleCompleteTaskIsSuccess={toggleCompleteTaskIsSuccess}
          onClose={handleCloseSidebar}
          isOpen={isTaskSidebarVisible}
          taskId={taskId}
          refetch={refetchTasks}
        />
      </div>
    </div>
  );
};
