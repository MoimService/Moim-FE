import { Tag } from '@/components/ui/Tag';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import type { IBanner, Member } from 'types/myMeeting';

import { Button } from '../../../../components/ui/Button';

const ModalUserList = ({
  memberList,
  className,
  meetingId,
  currentUser,
  handlePrefetchProfile,
  showPublicSelect = false,
}: {
  memberList: Member[];
  currentUser: IBanner;
  className?: string;
  handlePrefetchProfile: (member: Member) => Promise<void>;
  showPublicSelect?: boolean;
  meetingId: number;
}) => {
  const router = useRouter();

  const handleProfileClick = (user: Member) => {
    router.push(
      `/my-meeting/my/profile?meetingId=${meetingId}&userId=${user.userId}&memberStatus=${user.memberStatus}`,
      {
        scroll: false,
      },
    );
  };

  return (
    <div
      className="flex flex-col overflow-y-auto rounded-lg bg-BG_2 "
      onClick={(e) => e.stopPropagation()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.stopPropagation();
        }
      }}
    >
      <h3 className={`typo-head3 mb-2 text-main`}>맴버 리스트</h3>
      <div className={className}>
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
                {showPublicSelect && (
                  <Tag
                    variant={user.memberStatus}
                    className="w-[49px] justify-center"
                  />
                )}
                <div>
                  <Button
                    onClick={() => handleProfileClick(user)}
                    variant="outline"
                    size="sm"
                    onMouseEnter={() => handlePrefetchProfile(user)}
                  >
                    프로필 보기
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModalUserList;
