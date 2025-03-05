'use client';

import Dropdown from '@/components/common/Dropdown';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import Modal from '@/components/ui/modal/Modal';
import {
  useExpelMutation,
  useMemberStatusMutation,
} from '@/hooks/mutations/useMyMeetingMutation';
import Image from 'next/image';
import { useState } from 'react';
import type { Member } from 'types/myMeeting';

import ModalProfile from './ModalProfile';
import ModalUserList from './ModalUserList';

const CardRightSection = ({
  memberList,
  isPublic,
  className,
  meetingId,
}: {
  memberList: Member[];
  isPublic: boolean;
  className?: string;
  meetingId: number;
}) => {
  const [selectedFilter, setSelectedFilter] = useState(
    isPublic ? '공개' : '비공개',
  );
  const [isUserListModalOpen, setIsUserListModalOpen] = useState(false);
  const handleConfirm = () => {
    setIsUserListModalOpen(false);
  };
  const filterAreaOptions = [
    { value: 'true', label: '공개' },
    { value: 'false', label: '비공개' },
  ];

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

  // 프로필 보기 할 유저
  const [selectedUser, setSelectedUser] = useState<Member | null>(null);

  return (
    <div className={`flex w-full gap-[24px] px-4 lg:w-[518px] ${className}`}>
      <div className="hidden flex-col justify-center gap-[16px] lg:flex">
        <h3 className="typo-head3  text-main">참가 중인 멤버</h3>
        <div className="h-[172px] overflow-y-auto">
          {memberList.map((member: Member) => (
            <div key={member.userId} className="flex items-center py-[8px]">
              <Image
                src={member.profilePic}
                alt="맴버 프로필"
                width={40}
                height={40}
                className="rounded-[9.92px] "
              />
              <p className="typo-head3 w-[114px] p-[6px] text-Cgray700">
                {member.name}
              </p>
              <div className="flex h-[40px] gap-[6px]">
                <Tag variant={member.memberStatus} className="w-[49px]" />
                <Button
                  variant={'outline'}
                  className="h-[40px] w-[93px]"
                  onClick={() => setIsUserProfileModalOpen(true)}
                >
                  프로필보기
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button
        variant="outline"
        className="flex h-[40px] flex-1 md:h-[46px] lg:hidden"
        onClick={() => setIsUserListModalOpen(true)}
      >
        맴버 명단 보기
      </Button>
      <div className="flex w-[120px] items-center">
        <Dropdown
          options={filterAreaOptions}
          trigger={selectedFilter}
          onChange={setSelectedFilter}
          className="h-[40px] md:h-[46px]"
          contentClassName=""
          variant="icon"
        />
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
        />
      </Modal>
    </div>
  );
};

export default CardRightSection;
