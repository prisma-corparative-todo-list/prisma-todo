import { FC, useState } from 'react';
import { useGetTasks, useTaskStore } from '../../../shared';
import { TaskItem } from '../../../entities/task';
import { Task } from 'prisma/prisma-client';
import { CompletedTasksList } from '../../../features/task';

interface IProps {
  date: Date | null;
  tasks: Task[];
  onOpenTaskSidebar: (e: any) => void;
  onToggleComplete: (e: any) => void;
  onToggleImportantStatus: (e: any) => void;
}

export const TasksList: FC<IProps> = ({
  date,
  tasks,
  onOpenTaskSidebar,
  onToggleComplete,
  onToggleImportantStatus,
}) => {
  const { isTaskInputVisible, hideTaskInput } = useTaskStore();

  return (
    <div
      onClick={hideTaskInput}
      className="overflow-auto h-[80%] rounded-2xl px-5"
    >
      <h3 className="">
        Count : {tasks.filter((el) => el.isCompleted === false)?.length}
      </h3>
      <ul className="pb-2 pt-5 relative">
        {tasks
          .filter((el) => el.isCompleted === false)
          .map((task) => (
            <TaskItem
              onToggleImportantStatus={onToggleImportantStatus}
              onToggleCompleteTask={onToggleComplete}
              onOpenTaskSidebar={onOpenTaskSidebar}
              key={task.id}
              task={task}
            />
          ))}
      </ul>
      <CompletedTasksList
        count={tasks?.filter((el) => el.isCompleted === true).length}
        onToggleComplete={onToggleComplete}
        onOpenTaskSidebar={onOpenTaskSidebar}
        tasks={tasks?.filter((el) => el.isCompleted === true)}
      />
    </div>
  );
};
