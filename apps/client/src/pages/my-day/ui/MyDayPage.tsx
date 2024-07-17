import { useEffect, useState } from 'react';
import { getWeedayMonthAndDay, useGetTasks } from '../../../shared';
import { AddTaskPanel, TasksList, TaskSidebar } from '../../../widgets/task';
import {
  useCreateTask,
  useToggleCompleteTask,
  useToggleImportantStatus,
} from '../../../shared/api/queries/task.queries';

export const MyDayPage = () => {
  const formattedDate = getWeedayMonthAndDay(new Date());

  const [date, setDate] = useState<Date>(
    new Date(new Date(Date.now()).toDateString())
  );

  const {
    tasks,
    tasksIsSuccess,
    tasksIsError,
    tasksIsPending,
    refetch: refetchTasks,
  } = useGetTasks({ deadline: date });

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
      new Date(new Date(e.target?.closest('button').id || e?.$d).toDateString())
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
  }) => {
    createTask(payload);
  };

  useEffect(() => {
    if (toggleCompleteTaskIsSuccess || toggleImportantStatusIsSuccess) {
      refetchTasks();
    }
  }, [toggleCompleteTaskIsSuccess, toggleImportantStatusIsSuccess]);

  return (
    <div className="flex">
      <div className="p-5 h-screen basis-full">
        <h1 className="text-3xl mb-2">My day</h1>
        <h3 className="pb-3">{formattedDate}</h3>
        <TasksList
          onToggleImportantStatus={handleToggleImportant}
          onToggleComplete={handleToggleComplete}
          onOpenTaskSidebar={handleOpenSidebar}
          tasks={tasks || []}
          date={date}
        />
        <AddTaskPanel
          onChangeDate={handleChangeDate}
          date={date}
          createTaskIsSuccess={createTaskIsSuccess}
          onAddTask={handleCreateTask}
          refreshTasks={refetchTasks}
        />
      </div>
      <TaskSidebar
        onToggleComplete={handleToggleComplete}
        toggleCompleteTaskIsSuccess={toggleCompleteTaskIsSuccess}
        onClose={handleCloseSidebar}
        isOpen={isTaskSidebarVisible}
        taskId={taskId}
        refetch={refetchTasks}
      />
    </div>
  );
};
