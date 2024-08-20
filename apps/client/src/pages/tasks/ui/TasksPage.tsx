import { TasksList, AddTaskPanel, TaskSidebar } from '../../../widgets/task';
import {
  getWeedayMonthAndDay,
  PageLayout,
  useTask,
} from '../../../shared';
import { useEffect, useState } from 'react';
import { TasksHeader } from '../../../features/tasks-header';

export const TasksPage = () => {
  const [taskId, setTaskId] = useState('');

  const [date, setDate] = useState<Date | null>(null);

  const [isTaskSidebarVisible, setIsTaskSidebarVisible] = useState(false);

  const {
    tasks,
    refetchTasks,
    toggleImportantStatus,
    toggleImportantStatusIsSuccess,
    toggleCompleteTask,
    toggleCompleteTaskIsSuccess,
    createTask,
    createTaskIsSuccess,
  } = useTask();

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

  const dateWithoutTime = new Date(new Date().toDateString());

  useEffect(() => {
    if (toggleCompleteTaskIsSuccess || toggleImportantStatusIsSuccess) {
      refetchTasks();
    }
  }, [toggleCompleteTaskIsSuccess, toggleImportantStatusIsSuccess]);

  return (
    <div className="flex">
      <PageLayout>
      <TasksHeader title='All Tasks'/>
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
      </PageLayout>
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
