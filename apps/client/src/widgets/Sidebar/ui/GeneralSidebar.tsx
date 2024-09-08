
import { SystemLists, UserLists } from '../../../features/lists';
import { useTaskStore, useListStore } from '../../../shared';
import { UserProfileButton } from '../../user';
import { SystemLinks } from '../../../features/system-links';
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
      <SystemLinks/>
      <SystemLists />
      <UserLists />
    </div>
  );
};
