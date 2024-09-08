import { ListItemContent } from '../../../shared';
import { SystemListItemLink } from '../../../entities/list';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
export const SystemLinks = () => {
  return (
    <ul className="border-t-2 border-black pt-2">
      <SystemListItemLink pageUrl={'home'}>
        <HomeIcon fontSize="large" />
        <ListItemContent>Home</ListItemContent>
      </SystemListItemLink>
      <SystemListItemLink pageUrl={'groups'}>
        <GroupIcon fontSize="large" />
        <ListItemContent>Groups</ListItemContent>
      </SystemListItemLink>
    </ul>
  );
};
