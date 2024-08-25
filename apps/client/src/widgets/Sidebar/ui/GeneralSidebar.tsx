import { Link } from 'react-router-dom';
import { SystemLists, UserLists } from '../../../features/lists';
import { useTaskStore, useListStore } from '../../../shared';
import GroupIcon from '@mui/icons-material/Group';
import { PAGE_URLS } from '../../../shared/model/constants';
import { UserProfileButton } from '../../user';

export const GeneralSidebar = () => {
  const { hideTaskInput } = useTaskStore();

  const { hideLists } = useListStore();

  const handleHideAllModals = () => {
    hideTaskInput();
  };

  return (
    <div
      className="w-[35%] bg-[#faf9f0] h-screen pt-[15px] px-[25px]"
      onClick={handleHideAllModals}
    >
      <UserProfileButton />
      <SystemLists />
      <Link
        className="hover:bg-[#e2e3d1] mt-2 flex items-center gap-5 rounded-lg w-full p-2"
        to={`${PAGE_URLS.GROUPS}`}
      >
        <GroupIcon fontSize="large" />
        <span className="text-2xl">Groups</span>
      </Link>
      <UserLists />
    </div>
  );
};
