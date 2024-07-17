import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  MouseEventHandler,
  useState,
} from 'react';
import { getWeekday, getWeedayMonthAndDay } from '../../../shared';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';

interface IProps {
  onChangeDate: (e: any) => void;
  date: Date | null
  text: string;
  className: string;
}

export const DatePicker: FC<IProps> = ({
  onChangeDate,
  date,
  text,
  className,
}) => {
  const [isSelectVisible, setIsSelectVisible] = useState(false);

  const [isCalendarVisible, setIsCalendarVisibel] = useState(false);

  const handleToggleSelect = () => {
    setIsSelectVisible((prev) => !prev);
    setIsCalendarVisibel(false);
  };

  const handleToggleCalendar = () => {
    setIsSelectVisible(false);
    setIsCalendarVisibel((prev) => !prev);
  };

  const handleChangeDate = (e: any) => {
    onChangeDate(e);
    setIsCalendarVisibel(false);
    setIsSelectVisible(false);
  };

  const today = new Date();

  const tomorrow = new Date(today);

  const inAWeek = new Date(today);

  tomorrow.setDate(today.getDate() + 1);

  inAWeek.setDate(today.getDate() + 7);

  return (
    <>
      {isSelectVisible && (
        <ul className={`bg-white rounded-xl w-[300px] ${className}`}>
          <li className="py-3 hover:bg-slate-100 px-5 rounded-t-xl">
            <button
              onClick={handleChangeDate}
              id={today.toDateString()}
              className="flex justify-between items-center w-full"
            >
              <span id={tomorrow.toDateString()} className="text-base">Today</span>
              <span id={tomorrow.toDateString()} className="text-base">{getWeekday(today)}</span>
            </button>
          </li>
          <li className="py-3 hover:bg-slate-100 w-full px-5">
            <button
              onClick={handleChangeDate}
              id={tomorrow.toDateString()}
              className="flex justify-between items-center w-full"
            >
              <span className="text-base">Tommorow</span>
              <span className="text-base">{getWeekday(tomorrow)}</span>
            </button>
          </li>
          <li className="py-3 hover:bg-slate-100 w-full px-5">
            <button
              onClick={handleChangeDate}
              id={inAWeek.toDateString()}
              className="flex justify-between items-center w-full"
            >
              <span id={tomorrow.toDateString()} className="text-base">In a week</span>
              <span id={tomorrow.toDateString()} className="text-base">{getWeedayMonthAndDay(inAWeek)}</span>
            </button>
          </li>
          {date && (
            <li className="py-3 hover:bg-slate-100 w-full px-5">
              <button>Delete deadline</button>
            </li>
          )}
          <li
            onClick={handleToggleCalendar}
            className="py-3 hover:bg-slate-100 w-full px-5 text-center"
          >
            <button className="">Custom</button>
          </li>
        </ul>
      )}
      <button onClick={handleToggleSelect}>
        <CalendarMonthIcon fontSize="large" />
        {date && <span>{getWeedayMonthAndDay(date)}</span>}
      </button>
      {isCalendarVisible && (
        <DateCalendar
          onChange={handleChangeDate}
          minDate={dayjs(new Date())}
          sx={{
            position: 'absolute',
            bottom: '100px',
            right: '1px',
            backgroundColor: 'white',
            borderRadius: '10px',
          }}
        />
      )}
    </>
  );
};
