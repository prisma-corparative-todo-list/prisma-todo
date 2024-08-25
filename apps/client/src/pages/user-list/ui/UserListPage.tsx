import { useEffect, useState } from 'react';
import { AddTaskPanel, TasksList, TaskSidebar } from '../../../widgets/task';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useDeleteList,
  useGetList,
  useListStore,
  getWeedayMonthAndDay,
  useCreateTask,
  useGetUserListTasks,
  useToggleCompleteTask,
  useToggleImportantStatus,
  useTaskStore,
} from '../../../shared';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserListTitle } from '../../../features/user-list-title';
import { PAGE_URLS } from '../../../shared';

export const UserListPage = () => {
  const formattedDate = getWeedayMonthAndDay(new Date());

  const [date, setDate] = useState<Date | null>(null);

  const params = useParams();

  const { deleteList, deleteListIsSuccess } = useDeleteList();

  const { tasks, refetch: refetchTasks } = useGetUserListTasks(params?.listId);

  const { list, listIsSuccess, refetchList } = useGetList(
    params?.listId
  );

  const { createTask, createTaskIsSuccess } = useCreateTask();

  const { toggleCompleteTask, toggleCompleteTaskIsSuccess } =
    useToggleCompleteTask();

  const { toggleImportantStatus, toggleImportantStatusIsSuccess } =
    useToggleImportantStatus();

  const { defineDeleteListIsSuccess, updateListIsSuccess, listId, changeListId } = useListStore();

  const [isTaskSidebarVisible, setIsTaskSidebarVisible] = useState(false);

  const [taskId, setTaskId] = useState<string>('');

  const navigate = useNavigate();

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

  const handleChangeDate = (e: any) => {
    setDate(
      new Date(new Date(e.target?.closest('button').id || e?.$d).toDateString())
    );
  };

  const handleCreateTask = (payload: {
    title: string;
    listId?: string;
    deadLine: Date | null;
  }) => {
    createTask({...payload});
  };

  const handleDeleteList = () => {
    if (list) {
      deleteList(list.id);
    }
  };

  useEffect(() => {
      if(params.listId){
        changeListId(params.listId)
      }
  },[params.listId])

  useEffect(() => {
    if (toggleCompleteTaskIsSuccess || toggleImportantStatusIsSuccess) {
      refetchTasks();
    }
    if (deleteListIsSuccess) {
      navigate(PAGE_URLS.MY_DAY);
      refetchTasks();
      defineDeleteListIsSuccess(true);
    } else {
      defineDeleteListIsSuccess(false);
    }
    if (updateListIsSuccess) {
      refetchList();
    }
  }, [
    toggleCompleteTaskIsSuccess,
    toggleImportantStatusIsSuccess,
    listIsSuccess,
    deleteListIsSuccess,
    updateListIsSuccess,
    refetchTasks,
    navigate,
    defineDeleteListIsSuccess,
    refetchList,
  ]);

  return (
    <div className="flex">
      <div className="p-5 h-screen basis-full">
        <div className="flex justify-between items-center">
          {params.listId && listIsSuccess ? (
            <UserListTitle list={list} />
          ) : (
            <h1>...</h1>
          )}
          <button onClick={handleDeleteList}>
            <DeleteIcon fontSize="large" />
          </button>
        </div>
        <h3 className="pb-3">{formattedDate}</h3>
        <TasksList
          onToggleImportantStatus={handleToggleImportant}
          onToggleComplete={handleToggleComplete}
          onOpenTaskSidebar={handleOpenSidebar}
          tasks={tasks || []}
          date={date}
        />
        <AddTaskPanel
          listId={listId}
          onAddTask={handleCreateTask}
          createTaskIsSuccess={createTaskIsSuccess}
          refreshTasks={refetchTasks}
          date={date}
          onChangeDate={handleChangeDate}
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
