import { useEffect, useState } from 'react';
import { GroupSidebar } from '../../../widgets/group';
import { MessageList } from '../../../widgets/message';
import { MenuButton, useGroup, socket } from '../../../shared';
import { PostMessagePanel } from '../../../features/message';
import { useParams } from 'react-router-dom';

export const GroupPage = () => {
  const [isGroupSidebarVisible, setIsGroupSidebarVisible] =
    useState<boolean>(false);

  const handelToggleGroupSidebarVisibility = () => {
    setIsGroupSidebarVisible((prev) => !prev);
  };

  return (
    <div className="h-screen pt-[70px]">
      <MenuButton
        onClick={handelToggleGroupSidebarVisibility}
        className="absolute right-5 top-5"
      />
      <MessageList />
      <PostMessagePanel />
      <GroupSidebar
        isOpen={isGroupSidebarVisible}
        onClose={handelToggleGroupSidebarVisibility}
      />
    </div>
  );
};
