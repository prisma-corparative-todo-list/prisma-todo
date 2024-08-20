import { useState } from 'react';
import {
  GroupHeader,
  GroupInviteModal,
  GroupSidebar,
} from '../../../widgets/group';
import { MessageList } from '../../../widgets/message';
import { PostMessagePanel } from '../../../features/message';
import { useGetGroup } from '../../../shared/';
import { useParams } from 'react-router-dom';

export const GroupPage = () => {
  const { groupId } = useParams();

  const { group } = useGetGroup(groupId);

  const [isGroupSidebarVisible, setIsGroupSidebarVisible] =
    useState<boolean>(false);

  const [isGroupModalVisible, setIsGroupModalVisible] =
    useState<boolean>(false);

  const handelToggleGroupSidebarVisibility = () => {
    setIsGroupSidebarVisible((prev) => !prev);
  };

  const handelToggleGroupModalVisibility = () => {
    setIsGroupModalVisible((prev) => !prev);
    handelToggleGroupSidebarVisibility()
  };

  return (
    <div className="h-screen flex flex-col justify-around">
      <GroupHeader
        onToggleSidebarVisibility={handelToggleGroupSidebarVisibility}
        group={group}
      />
      <MessageList />
      <PostMessagePanel />
      <GroupSidebar
        group={group}
        isOpen={isGroupSidebarVisible}
        onClose={handelToggleGroupSidebarVisibility}
        onOpenModal={handelToggleGroupModalVisibility}
      />
      <GroupInviteModal
        isOpen={isGroupModalVisible}
        onClose={handelToggleGroupModalVisibility}
      />
    </div>
  );
};
