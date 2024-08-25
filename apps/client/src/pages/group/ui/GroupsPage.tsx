import { useState } from 'react';
import {
  GroupsList,
  CreateGroupModal,
  JoinGroupModal,
} from '../../../widgets/group';
import { useGetGroups } from '../../../shared';
import { GroupManagementButtons } from '../../../features/group';
import { InvitationsModal } from '../../../widgets/invitation';   

export const GroupsPage = () => {
  const {
    groupsIsError,
    groupsIsSuccess,
    groupsIsPending,
    groups,
    refetchGroups,
  } = useGetGroups();

  const [isCreateGroupModalVisible, setIsCreateGroupModalVisible] =
    useState<boolean>(false);

  const [isJoinGroupModalVisible, setIsJoinGroupModalVisible] =
    useState<boolean>(false);

  const [isInvitationsModalVisible, setIsInvitationsModalVisible] =
    useState<boolean>(false);

  const handleToggleCreateGroupModalVisibility = () =>
    setIsCreateGroupModalVisible((prev) => !prev);

  const handleToggleJoinGroupModalVisibility = () =>
    setIsJoinGroupModalVisible((prev) => !prev);

  const handleToggleInvitationsModalVisibility = () =>
    setIsInvitationsModalVisible((prev) => !prev);

  return (
    <>
      <div className="pl-[50px] pt-[50px] relative min-h-full">
        <h3 className="text-3xl mb-[15px]">Your Groups </h3>
        <GroupsList groups={groups} />
        <GroupManagementButtons
          onToggleInvitationsModalVisibility={
            handleToggleInvitationsModalVisibility
          }
          onToggleCreateGroupModalVisibility={
            handleToggleCreateGroupModalVisibility
          }
          onToggleJoinGroupModalVisibility={
            handleToggleJoinGroupModalVisibility
          }
        />
      </div>
      <CreateGroupModal
        isOpen={isCreateGroupModalVisible}
        onClose={handleToggleCreateGroupModalVisibility}
        refetchGroups={refetchGroups}
      />

      <JoinGroupModal
        isOpen={isJoinGroupModalVisible}
        onClose={handleToggleJoinGroupModalVisibility}
      />

      <InvitationsModal
        isOpen={isInvitationsModalVisible}
        refetchGroups={refetchGroups}
        onClose={handleToggleInvitationsModalVisibility}
      />
    </>
  );
};
