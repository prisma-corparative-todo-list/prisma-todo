import { FC, useEffect } from 'react';
import { useTaskStore } from '../../../shared';
import { TaskItem } from '../../../entities/task';
import { CompletedTasksList, OptimisticTasks } from '../../../features/task';
import { ExtendedTask, ICreateTask } from 'interfaces';
import { useMutationState, useQueryClient } from '@tanstack/react-query';
import { SERVICE_URL } from '../../../shared/model/constants';

interface IProps {
  date: Date | null;
  tasks: ExtendedTask[];
  onOpenTaskSidebar: (e: any) => void;
  onToggleComplete: (e: any) => void;
  onToggleImportantStatus: (e: any) => void;
  createTaskIsError: boolean;
  createTaskIsPending: boolean;
}

export const TasksList: FC<IProps> = ({
  tasks,
  onOpenTaskSidebar,
  onToggleComplete,
  onToggleImportantStatus,
  createTaskIsError,
  createTaskIsPending,
}) => {
  const { hideTaskInput } = useTaskStore();

  return (
    <div
      onClick={hideTaskInput}
      className="overflow-auto rounded-2xl px-5 py-5 h-[75vh]"
    >
      {
        tasks?.length !== 0 && (
          <h3 className="">
          Count : {tasks.filter((el) => el.isCompleted === false)?.length}
        </h3>
        )
      }
      <ul className="pb-2 pt-5 relative h-[75% ">
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

          <OptimisticTasks/>
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
