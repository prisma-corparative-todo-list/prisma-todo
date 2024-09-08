import { FC } from 'react';
import { useTaskStore } from '../../../shared';
import { OptimisticTaskItem, TaskItem } from '../../../entities/task';
import { CompletedTasksList } from '../../../features/task';
import { ExtendedTask, ICreateTask } from 'interfaces';

interface IProps {
  date: Date | null;
  tasks: ExtendedTask[];
  onOpenTaskSidebar: (e: any) => void;
  onToggleComplete: (e: any) => void;
  onToggleImportantStatus: (e: any) => void;
  createTaskIsError: boolean;
  createTaskSubmittedAt: number;
  createTaskVariables?: ICreateTask;
  createTaskIsPending: boolean;
}

export const TasksList: FC<IProps> = ({
  tasks,
  onOpenTaskSidebar,
  onToggleComplete,
  onToggleImportantStatus,
  createTaskIsError,
  createTaskSubmittedAt,
  createTaskVariables,
  createTaskIsPending,
}) => {
  const { hideTaskInput } = useTaskStore();

  return (
    <div
      onClick={hideTaskInput}
      className="overflow-auto h-[70%] rounded-2xl px-5 py-5"
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
              createTaskIsError={createTaskIsError}
              createTaskSubmittedAt={createTaskSubmittedAt}
              createTaskVariables={createTaskVariables}
            />
          ))}
        {createTaskIsPending && (
          <OptimisticTaskItem
            createTaskIsError={createTaskIsError}
            createTaskSubmittedAt={createTaskSubmittedAt}
            createTaskVariables={createTaskVariables}
          />
        )}
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
