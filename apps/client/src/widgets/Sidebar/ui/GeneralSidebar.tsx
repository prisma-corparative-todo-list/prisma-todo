import { Link } from 'react-router-dom';
import { SystemLists, UsersLists } from '../../../features/lists';
import PaidIcon from '@mui/icons-material/Paid';
import { useTaskStore, useListStore } from '../../../shared';
import GroupIcon from '@mui/icons-material/Group';
import { PAGE_URLS } from '../../../shared/model/constants';

export const GeneralSidebar = () => {
  const { hideTaskInput } = useTaskStore();

  const { hideLists } = useListStore();

  const handleHideAllModals = () => {
    hideTaskInput();
    // hideLists();
  };

  return (
    <div
      className="w-[35%] bg-[#faf9f0] h-screen pt-[15px] px-[25px]"
      onClick={handleHideAllModals}
    >
      <SystemLists />
      <Link className="hover:bg-[#e2e3d1] mt-5 flex items-center gap-5 rounded-lg w-full p-5" to={`${PAGE_URLS.GROUPS}`}>
        <GroupIcon fontSize="large" />
        <span className='text-2xl'>Groups</span>
      </Link>
      <UsersLists />
    </div>
  );
};
