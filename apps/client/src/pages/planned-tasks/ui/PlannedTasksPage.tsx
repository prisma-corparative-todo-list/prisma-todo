import { useEffect, useState } from 'react';
import { TasksList, AddTaskPanel, TaskSidebar } from '../../../widgets/task';
import {
  getWeedayMonthAndDay,
  PageLayout,
  useCreateTask,
  useGetTasks,
  useToggleCompleteTask,
  useToggleImportantStatus,
} from '../../../shared';
import { TasksHeader } from '../../../features/tasks-header';

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
  }, [
    refetchTasks,
    toggleCompleteTaskIsSuccess,
    toggleImportantStatusIsSuccess,
  ]);

  return (
    <div className="flex">
      <PageLayout className="flex flex-col justify-between">
        <div className="h-[70%]">
          <TasksHeader title="Planned tasks" />
          <TasksList
            onToggleImportantStatus={handleToggleImportant}
            onToggleComplete={handleToggleComplete}
            onOpenTaskSidebar={handleOpenSidebar}
            tasks={tasks || []}
            date={date}
          />
        </div>
        <AddTaskPanel
          onAddTask={handleCreateTask}
          createTaskIsSuccess={createTaskIsSuccess}
          refreshTasks={refetchTasks}
          date={date}
          onChangeDate={handleChangeDate}
        />
        <TaskSidebar
          onToggleComplete={handleToggleComplete}
          completeTaskIsSuccess={toggleCompleteTaskIsSuccess}
          onClose={handleCloseSidebar}
          isOpen={isTaskSidebarVisible}
          taskId={taskId}
          refetch={refetchTasks}
        />
      </PageLayout>
    </div>
  );
};
