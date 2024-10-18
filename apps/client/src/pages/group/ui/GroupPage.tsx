import { useEffect, useState } from 'react';
import {
  GroupHeader,
  GroupInviteModal,
  GroupSidebar,
} from '../../../widgets/group';
import { MessageList, PostMessageModal } from '../../../widgets/message';
import { PostMessagePanel } from '../../../widgets/message';
import {
  useGetGroup,
  useGetParticipants,
  usePostMessage,
} from '../../../shared/';
import { useParams } from 'react-router-dom';
import { useGroupStore } from '../../../shared';

export const GroupPage = () => {
  const { groupId } = useParams();

  const { group, groupIsSuccess } = useGetGroup(groupId);

  const { participants } = useGetParticipants(groupId);

  const { role, setRole } = useGroupStore();

  const {
    postMessage,
    postMessageIsSuccess,
    postMessageIsError,
    postMessageIsPending,
    postMessageVariables,
  } = usePostMessage();

  const [isGroupSidebarVisible, setIsGroupSidebarVisible] =
    useState<boolean>(false);

  const [isGroupModalVisible, setIsGroupModalVisible] =
    useState<boolean>(false);

  const handelToggleGroupSidebarVisibility = () => {
    setIsGroupSidebarVisible((prev) => !prev);
  };

  const handelToggleGroupModalVisibility = () => {
    setIsGroupModalVisible((prev) => !prev);
    handelToggleGroupSidebarVisibility();
  };

  useEffect(() => {
    if (groupIsSuccess && group) {
      setRole(group.role);
    }
  }, [group, groupIsSuccess, setRole]);

  return (
    <div className="h-screen flex flex-col justify-around">
      <GroupHeader
        onToggleSidebarVisibility={handelToggleGroupSidebarVisibility}
        groupName={group?.name}
        participants={participants}
      />
      <MessageList
        postMessageIsSuccess={postMessageIsSuccess}
        postMessageIsError={postMessageIsError}
        postMessageIsPending={postMessageIsPending}
        postMessageVariables={postMessageVariables}
      />
      <PostMessagePanel postMessage={postMessage} />
      <GroupSidebar
        group={group}
        participants={participants}
        isOpen={isGroupSidebarVisible}
        onClose={handelToggleGroupSidebarVisibility}
        onOpenModal={handelToggleGroupModalVisibility}
      />
      <GroupInviteModal
        isOpen={isGroupModalVisible}
        onClose={handelToggleGroupModalVisibility}
      />
      <PostMessageModal/>
    </div>
  );
};
