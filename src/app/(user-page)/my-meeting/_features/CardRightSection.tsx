'use client';

import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import Modal from '@/components/ui/modal/Modal';
import {
  useExpelMutation,
  useMemberStatusMutation,
} from '@/hooks/mutations/useMyMeetingMutation';
import { myMeetingKeys } from '@/hooks/queries/useMyMeetingQueries';
import { useBannerQueries } from '@/hooks/queries/useMyPageQueries';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';
import { getMyMeetingMemberProfile } from 'service/api/mymeeting';
import type { Member } from 'types/myMeeting';

import ModalProfile from './ModalProfile';
import ModalUserList from './ModalUserList';
import PublicSelect from './PublicDropdown';

const CardRightSection = ({
  memberList,
  isPublic,
  className,
  meetingId,
  showPublicSelect = false,
}: {
  memberList: Member[];
  isPublic: boolean;
  className?: string;
  meetingId: number;
  showPublicSelect?: boolean;
}) => {
  const [isUserListModalOpen, setIsUserListModalOpen] = useState(false);
  const handleConfirm = () => {
    setIsUserListModalOpen(false);
  };

  const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState(false);

  // 가입 승인 / 거절
  const { mutate: statusMutate } = useMemberStatusMutation(meetingId);

  // 내보내기
  const { mutate: expelMutate } = useExpelMutation(meetingId);

  const handleSecondModalConfirm = () => {
    // 가입 확인 api 연동
    // 만약, status가 approved라면 -> 내보내기 활성화
    // 만약, status가 pending이 아니라면 -> 닫기만 활성화

    if (selectedUser && selectedUser.memberStatus === 'PENDING') {
      statusMutate({
        setMemberStatus: 'APPROVED',
        userId: selectedUser?.userId,
      });
    }

    setIsUserProfileModalOpen(false);
  };

  const handleSecondModalCancel = () => {
    // 가입 거절 api 연동
    if (selectedUser && selectedUser.memberStatus === 'PENDING') {
      statusMutate({
        setMemberStatus: 'REJECTED',
        userId: selectedUser?.userId,
      });
    } else if (selectedUser && selectedUser.memberStatus === 'APPROVED') {
      expelMutate({
        setMemberStatus: 'EXPEL',
        userId: selectedUser?.userId,
      });
    }

    setIsUserProfileModalOpen(false);
  };

  // 데스크탑 뷰에서 유저 프로필 보기
  const handleOpenProfileModal = (
    e: React.MouseEvent<HTMLButtonElement>,
    member: Member,
  ) => {
    e.stopPropagation();
    setSelectedUser(member);
    setIsUserProfileModalOpen(true);
  };

  const queryClient = useQueryClient();

  const handlePrefetchProfile = async (member: Member) => {
    const queryKey = myMeetingKeys.memberProfile(meetingId, member.userId);

    // 캐시에 데이터가 있는지 확인
    const cachedData = queryClient.getQueryData(queryKey);

    if (!cachedData) {
      await queryClient.prefetchQuery({
        queryKey,
        queryFn: () =>
          getMyMeetingMemberProfile({ meetingId, userId: member.userId }),
      });
    }
  };

  // 프로필 보기 할 유저
  const [selectedUser, setSelectedUser] = useState<Member | null>(null);

  const { data: currentUser, isLoading, error } = useBannerQueries();
  if (isLoading || !currentUser) {
    return;
  }

  return (
    <div
      className={`flex w-full justify-between gap-[24px] px-4 hover:cursor-default lg:w-[518px] ${className}`}
      onClick={(e) => e.stopPropagation()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.stopPropagation();
        }
      }}
    >
      <div className="hidden flex-col justify-center gap-[16px] lg:flex">
        <h3 className="typo-head3 text-main">참가 중인 멤버</h3>
        <div className="h-[172px] overflow-y-auto">
          {memberList.map((member: Member) => (
            <div key={member.userId} className="flex items-center py-[8px]">
              <Image
                src={member.profilePic}
                alt="맴버 프로필"
                width={40}
                height={40}
                className="rounded-[9.92px]"
              />
              <p className="typo-head3 w-[114px] p-[6px] text-Cgray700">
                {member.name}
              </p>
              {member.userId !== currentUser?.userId && (
                <div className="flex h-[40px] gap-[6px]">
                  {showPublicSelect && (
                    <Tag variant={member.memberStatus} className="w-[49px]" />
                  )}
                  <Button
                    variant={'outline'}
                    className="h-[40px] w-[93px]"
                    onClick={(e) => handleOpenProfileModal(e, member)}
                    onMouseEnter={() => handlePrefetchProfile(member)}
                  >
                    프로필보기
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-1 gap-[16px]">
        <Button
          variant="outline"
          className="flex h-[40px] flex-1 md:h-[46px] lg:hidden"
          onClick={() => setIsUserListModalOpen(true)}
        >
          맴버 명단 보기
        </Button>
        {showPublicSelect && (
          <PublicSelect isPublic={isPublic} meetingId={meetingId} />
        )}
      </div>

      <Modal
        isOpen={isUserProfileModalOpen}
        onClose={handleSecondModalCancel}
        onConfirm={handleSecondModalConfirm}
        confirmText={
          selectedUser?.memberStatus === 'PENDING' ? '가입승인' : '닫기'
        }
        cancelText={
          selectedUser?.memberStatus === 'PENDING'
            ? '가입거절'
            : selectedUser?.memberStatus === 'APPROVED'
              ? '내보내기'
              : '닫기'
        }
        closeOnly={
          !(
            selectedUser?.memberStatus === 'PENDING' ||
            selectedUser?.memberStatus === 'APPROVED'
          )
        }
        modalClassName="w-[450px] overflow-hidden bg-BG_2"
        buttonClassName="w-full"
      >
        <ModalProfile userId={selectedUser?.userId} meetingId={meetingId} />
      </Modal>
      <Modal
        isOpen={isUserListModalOpen}
        onClose={() => setIsUserListModalOpen(false)}
        onConfirm={handleConfirm}
        showOnly
        modalClassName="h-[590px] w-[520px] overflow-y-auto"
      >
        <ModalUserList
          memberList={memberList}
          setSelectedUser={setSelectedUser}
          setIsUserProfileModalOpen={setIsUserProfileModalOpen}
          setIsUserListModalOpen={setIsUserListModalOpen}
          currentUser={currentUser}
          handlePrefetchProfile={handlePrefetchProfile}
          showPublicSelect={showPublicSelect}
        />
      </Modal>
    </div>
  );
};

export default CardRightSection;
