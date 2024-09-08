import LightModeIcon from '@mui/icons-material/LightMode';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { PAGE_URLS } from '../../../shared/model/constants';
import GroupIcon from '@mui/icons-material/Group';
import { SystemListItemLink } from '../../../entities/list/';
import { ListItemContent } from '../../../shared';


export const SystemLists = () => (
  <ul className="border-y-2 border-black py-2">
    <SystemListItemLink pageUrl={`${PAGE_URLS.MY_DAY}`}>
      <LightModeIcon fontSize="large" />
      <ListItemContent>My Day</ListItemContent>
    </SystemListItemLink>
    <SystemListItemLink pageUrl={`${PAGE_URLS.IMPORTANT_TASKS}`}>
      <StarBorderIcon fontSize="large" />
      <ListItemContent>Important</ListItemContent>
    </SystemListItemLink>
    <SystemListItemLink pageUrl={`${PAGE_URLS.PLANNED_TASKS}`}>
      <CalendarMonthIcon fontSize="large" />
      <ListItemContent>Planned</ListItemContent>
    </SystemListItemLink>
    <SystemListItemLink pageUrl={`${PAGE_URLS.TASKS}`}>
      <FormatListBulletedIcon fontSize="large" />
      <ListItemContent>Tasks</ListItemContent>
    </SystemListItemLink>
    <SystemListItemLink pageUrl={`${PAGE_URLS.GROUP_TASKS}`}>
      <GroupIcon fontSize="large" />
      <ListItemContent>Group Tasks</ListItemContent>
    </SystemListItemLink>
  </ul>
);
