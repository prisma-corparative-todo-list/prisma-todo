import { Link } from 'react-router-dom';
import LightModeIcon from '@mui/icons-material/LightMode';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { PAGE_URLS } from '../../../shared/model/constants';
import GroupIcon from '@mui/icons-material/Group';
import { SystemListItemLink } from '../../../entities/list/';

export const SystemLists = () => (
  <ul className="border-y-2 border-black py-2">
    <SystemListItemLink pageUrl={`${PAGE_URLS.MY_DAY}`}>
      <LightModeIcon fontSize="large" />
      <span className="text-2xl">My Day</span>
    </SystemListItemLink>
    <SystemListItemLink pageUrl={`${PAGE_URLS.IMPORTANT_TASKS}`}>
      <StarBorderIcon fontSize="large" />
      <span className="text-2xl">Important</span>
    </SystemListItemLink>
    <SystemListItemLink pageUrl={`${PAGE_URLS.PLANNED_TASKS}`}>
      <CalendarMonthIcon fontSize="large" />
      <span className="text-2xl">Planned</span>
    </SystemListItemLink>
    <SystemListItemLink pageUrl={`${PAGE_URLS.TASKS}`}>
      <FormatListBulletedIcon fontSize="large" />
      <span className="text-2xl">Tasks</span>
    </SystemListItemLink>
    <SystemListItemLink pageUrl={`${PAGE_URLS.GROUP_TASKS}`}>
      <GroupIcon fontSize="large" />
      <span className="text-2xl">Group Tasks</span>
    </SystemListItemLink>
  </ul>
);
