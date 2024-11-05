import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useUpdateTask } from '../../../shared';
import dayjs, { Dayjs } from 'dayjs';
import { FC, useEffect, useState } from 'react';

interface IProps {
  taskId: string;
  refetchTasks: () => void;
  refetchTask: () => void;
  date?: Date | null;
}

export const SidebarDatePicker: FC<IProps> = ({
  taskId,
  refetchTasks,
  date,
  refetchTask,
}) => {
  const [isDatePickerVisible, setIsDatePickerVisible] =
    useState<boolean>(false);

  const { updateTask, updateTaskIsSuccess } = useUpdateTask(taskId);
  const handleChangeDate = (e: Dayjs) => {
    console.log(e);
    updateTask({ deadLine: e.toDate() });
  };

  const toggleDatePicker = () => {
    setIsDatePickerVisible((prevState) => !prevState);
  };

  useEffect(() => {
    if (updateTaskIsSuccess) {
      refetchTasks();
      refetchTask();
    }
  }, [refetchTask, refetchTasks, updateTaskIsSuccess]);

  return (
    <>
      {/* <button
        className='border-2 mx-2 rounded-lg p-2 mb-2 block"'
        onClick={toggleDatePicker}
      >
        {date ? 'Edit date' : 'Set date'}
      </button> */}
      <DateCalendar
        className="border-2 rounded-xl block bg-slate-50 right-10"
        sx={{
          margin: '5px 5px',
        }}
        onChange={handleChangeDate}
        minDate={dayjs(new Date())}
        value={date ? dayjs(new Date(date)) : null}
      />
    </>
  );
};
