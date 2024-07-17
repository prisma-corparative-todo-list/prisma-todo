import { TasksList, AddTaskPanel, TaskSidebar } from '../../../widgets/task';
import {
  useToggleImportantStatus,
  useToggleCompleteTask,
  useGetTasks,
  getWeedayMonthAndDay,
  useCreateTask,
} from '../../../shared';
import { useEffect, useState } from 'react';

export const TasksPage = () => {
  const [taskId, setTaskId] = useState('');

  const [date, setDate] = useState<Date | null>(null);

  const [isTaskSidebarVisible, setIsTaskSidebarVisible] = useState(false);

  const { createTask, createTaskIsSuccess } = useCreateTask();

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
  } = useGetTasks();

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

  const handleCreateTask = (payload: {
    title: string;
    list?: string;
    deadLine: Date | null;
    listId?: string;
  }) => {
    createTask(payload);
  };

  const formattedDate = getWeedayMonthAndDay(new Date());

  const dateWithoutTime = new Date(new Date().toDateString());

  useEffect(() => {
    if (toggleCompleteTaskIsSuccess || toggleImportantStatusIsSuccess) {
      refetchTasks();
    }
  }, [toggleCompleteTaskIsSuccess, toggleImportantStatusIsSuccess]);

  return (
    <div className="flex">
      <div className="p-5 h-screen basis-full">
        <h1 className="text-3xl mb-2">All Tasks</h1>
        <h3 className="pb-3">{formattedDate}</h3>
        <TasksList
          onToggleImportantStatus={handleToggleImportant}
          onToggleComplete={handleToggleComplete}
          onOpenTaskSidebar={handleOpenSidebar}
          tasks={tasks || []}
          date={dateWithoutTime}
        />
        <AddTaskPanel
          onChangeDate={handleChangeDate}
          date={date}
          onAddTask={handleCreateTask}
          refreshTasks={refetchTasks}
          createTaskIsSuccess={createTaskIsSuccess}
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
