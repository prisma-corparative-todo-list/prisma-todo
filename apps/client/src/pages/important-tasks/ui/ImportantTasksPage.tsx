import { AddTaskPanel, TaskSidebar, TasksList } from '../../../widgets/task';
import {
  getWeedayMonthAndDay,
  useGetTasks,
  useToggleImportantStatus,
  useToggleCompleteTask,
  useCreateTask,
  PageLayout,
} from '../../../shared';
import { useEffect, useState } from 'react';
import { TasksHeader } from '../../../features/tasks-header';

export const ImportantTasksPage = () => {
  const [taskId, setTaskId] = useState('');

  const [isTaskSidebarVisible, setIsTaskSidebarVisible] = useState(false);

  const [date, setDate] = useState<Date | null>(null);

  const {
    toggleImportantStatus,
    toggleImportantStatusIsError,
    toggleImportantStatusIsLoading,
    toggleImportantStatusIsSuccess,
  } = useToggleImportantStatus();

  const {
    toggleCompleteTask,
    toggleCompleteTaskIsSuccess,
    toggleCompleteTaskIsError,
  } = useToggleCompleteTask();

  const {
    tasks,
    tasksIsSuccess,
    tasksIsError,
    tasksIsPending,
    refetch: refetchTasks,
  } = useGetTasks({ isImportant: true });

  const { createTask, createTaskIsSuccess } = useCreateTask();

  const handleCreateTask = (payload: {
    title: string;
    list?: string;
    deadLine: Date | null;
    isImportant?: boolean;
  }) => {
    createTask({ isImportant: true, ...payload });
  };

  const handleChangeDate = (e: any) => {
    setDate(
      new Date(new Date(e.target?.closest('button').id || e?.$d).toDateString())
    );
  };

  const handleToggleImportant = (taskId: string) => {
    toggleImportantStatus(taskId);
  };

  const handleToggleComplete = (taskId: string) => {
    toggleCompleteTask(taskId);
  };

  const handleCloseSidebar = () => {
    setIsTaskSidebarVisible(false);
  };

  const handleOpenSidebar = (e: any) => {
    setTaskId(e.target.closest('li')?.id);
    setIsTaskSidebarVisible(true);
  };

  const dateWithoutTime = new Date(new Date().toDateString());

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
          <TasksHeader title="Important tasks" />
          <TasksList
            onToggleImportantStatus={handleToggleImportant}
            onToggleComplete={handleToggleComplete}
            onOpenTaskSidebar={handleOpenSidebar}
            tasks={tasks || []}
            date={dateWithoutTime}
          />
        </div>
        <AddTaskPanel
          onChangeDate={handleChangeDate}
          date={date}
          createTaskIsSuccess={createTaskIsSuccess}
          onAddTask={handleCreateTask}
          refreshTasks={refetchTasks}
        />
      </PageLayout>
      <TaskSidebar
        onToggleComplete={handleToggleComplete}
        completeTaskIsSuccess={toggleCompleteTaskIsSuccess}
        onClose={handleCloseSidebar}
        isOpen={isTaskSidebarVisible}
        taskId={taskId}
        refetch={refetchTasks}
      />
    </div>
  );
};
