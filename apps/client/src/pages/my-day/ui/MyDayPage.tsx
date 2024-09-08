import { useEffect, useState } from 'react';
import {
  getWeedayMonthAndDay,
  PageLayout,
  useGetTasks,
  useTask,
} from '../../../shared';
import { AddTaskPanel, TasksList, TaskSidebar } from '../../../widgets/task';
import {
  useCreateTask,
  useToggleCompleteTask,
  useToggleImportantStatus,
} from '../../../shared/api/queries/task.queries';
import { TasksHeader } from '../../../features/tasks-header';

export const MyDayPage = () => {
  const formattedDate = getWeedayMonthAndDay(new Date());

  const [date, setDate] = useState(
    new Date(new Date().setUTCHours(0, 0, 0, 0))
  );

  const {
    tasks,
    tasksIsSuccess,
    tasksIsError,
    tasksIsPending,
    refetch: refetchTasks,
  } = useGetTasks({
    isToday: true,
    deadline: new Date(new Date().setUTCHours(0, 0, 0, 0)),
  });

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

  const [isTaskSidebarVisible, setIsTaskSidebarVisible] = useState(false);

  const [taskId, setTaskId] = useState<string>('');

  const handleChangeDate = (e: any) => {
    setDate(
      new Date(
        new Date(e.target?.closest('button').id || e?.$d).setUTCHours(
          0,
          0,
          0,
          0
        )
      )
    );
  };

  const handleCloseSidebar = () => {
    setIsTaskSidebarVisible(false);
  };

  const handleOpenSidebar = (e: any) => {
    setTaskId(e.target.closest('li')?.id);
    setIsTaskSidebarVisible(true);
  };

  const handleToggleComplete = (taskId: string) => {
    toggleCompleteTask(taskId);
  };

  const handleToggleImportant = (taskId: string) => {
    toggleImportantStatus(taskId);
  };

  const handleCreateTask = (payload: {
    title: string;
    list?: string;
    deadLine: Date | null;
    listId?: string;
    isToday?: boolean;
  }) => {
    createTask({ ...payload, isToday: true });
  };

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
          <TasksHeader title="My Day" />
          <TasksList
            onToggleImportantStatus={handleToggleImportant}
            onToggleComplete={handleToggleComplete}
            onOpenTaskSidebar={handleOpenSidebar}
            tasks={tasks || []}
            date={date}
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
