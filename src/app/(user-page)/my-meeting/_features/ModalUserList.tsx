import { Tag } from '@/components/ui/Tag';
import { useBannerQueries } from '@/hooks/queries/useMyPageQueries';
import Image from 'next/image';
import React from 'react';
import { Dispatch, SetStateAction, useState } from 'react';
import type { Member } from 'types/myMeeting';

import { Button } from '../../../../components/ui/Button';

const ModalUserList = ({
  memberList,
  setIsUserProfileModalOpen,
  setIsUserListModalOpen,
  setSelectedUser,
}: {
  memberList: Member[];
  setSelectedUser: Dispatch<React.SetStateAction<Member | null>>;
  setIsUserProfileModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsUserListModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { data: currentUser, isLoading, error } = useBannerQueries();

  const handleProfileClick = (user: Member) => {
    setSelectedUser(user);
    setIsUserProfileModalOpen(true);
    setIsUserListModalOpen(false);
  };

  return (
    <div className="flex flex-col">
      <h3 className="typo-head3 mb-2 text-main">맴버 리스트</h3>
      {memberList.map((user) => (
        <div
          key={user.userId}
          className="flex items-center justify-between gap-4 py-2"
        >
          <div className="flex items-center gap-[6px]">
            <Image
              width={40}
              height={40}
              src={user.profilePic}
              alt="유저 프로필"
              className="h-[40px] w-[40px] rounded-[9.92px]"
            />
            <h3 className="typo-head3 text-Cgray700">{user.name}</h3>
          </div>
          {user.userId !== currentUser?.userId && (
            <div className="flex gap-[6px]">
              <Tag variant={user.memberStatus} className="w-[49px]" />
              <div>
                <Button
                  onClick={() => handleProfileClick(user)}
                  variant="outline"
                  size="sm"
                >
                  프로필 보기
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ModalUserList;
