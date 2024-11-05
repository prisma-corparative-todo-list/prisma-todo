import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useUpdateTask } from '../../../shared';
import dayjs, { Dayjs } from 'dayjs';
import { FC, useEffect } from 'react';

interface IProps {
  taskId: string;
  refetchTasks: () => void;
}

export const SidebarDatePicker: FC<IProps> = ({ taskId, refetchTasks }) => {
  const { updateTask, updateTaskIsSuccess } = useUpdateTask(taskId);
  const handleChangeDate = (e: Dayjs) => {
    updateTask({ deadLine: e.toDate() });
  };

  useEffect(() => {
    if(updateTaskIsSuccess)
    refetchTasks()
  },[refetchTasks, updateTaskIsSuccess])

  return (
    <div className="mx-auto my-2">
      <DateCalendar onChange={handleChangeDate} minDate={dayjs(new Date())} />
    </div>
  );
};
