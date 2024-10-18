import AddIcon from '@mui/icons-material/Add';
import { useListStore, useTaskStore } from '../../../shared';
import { DatePicker } from '../../../features/date-picker';
import { SelectLists } from '../../../features/lists';
import React, { FC, useEffect, useState } from 'react';

interface IProps {
  refreshTasks: () => void;
  date: Date | null;
  onAddTask: (payload: {
    title: string;
    listId?: string;
    deadLine: Date | null;
    isImportant?: boolean;
    isToday?: boolean;
  }) => void;
  createTaskIsSuccess?: boolean;
  onChangeDate: (e: any) => void;
}

export const AddTaskPanel: FC<IProps> = ({
  refreshTasks,
  onAddTask,
  date,
  createTaskIsSuccess,
  onChangeDate,
}) => {
  const { isTaskInputVisible, showTaskInput } = useTaskStore();

  const { listId } = useListStore();

  const [task, setTask] = useState<string>('');

  const handleChangeTaskValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleCreateTask = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {

    if (task.length < 1) return;
    if (event.key === 'Enter') {
      console.log("Enter")
      onAddTask({
        title: task,
        deadLine: date,
        listId: listId,
      });
      setTask('');
    }
  };


  useEffect(() => {
    if (createTaskIsSuccess) {
      refreshTasks();
    }
    if (isTaskInputVisible) {
      setTask('');
    }
  }, [createTaskIsSuccess, isTaskInputVisible, refreshTasks]);

  return (
    <div className="bg-[#faf9f0] p-5 rounded-lg flex justify-between relative">
      {isTaskInputVisible ? (
        <>
          <div className="w-[55%] flex items-center">
            <div className="h-[25px] w-[30px] border border-black rounded-full mr-[15px]"></div>
            <input
              value={task}
              onKeyUp={handleCreateTask}
              onChange={handleChangeTaskValue}
              className="w-full outline-none bg-[#faf9f0] border-b border-[black]"
            />
          </div>
          <div className="flex gap-5">
            {task.length >= 1 && (
              <>
                <SelectLists />
                <DatePicker
                  onChangeDate={onChangeDate}
                  date={date}
                  className="absolute right-1 top-[-245px]"
                />
              </>
            )}
          </div>
        </>
      ) : (
        <button
          className="flex items-center gap-5 w-full"
          onClick={showTaskInput}
        >
          <AddIcon />
          <p className="text-xl">add task</p>
        </button>
      )}
    </div>
  );
};
