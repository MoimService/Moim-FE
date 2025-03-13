'use client';

import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { myMeetingKeys } from '@/hooks/queries/useMyMeetingQueries';
import { useBannerQueries } from '@/hooks/queries/useMyPageQueries';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getMyMeetingMemberProfile } from 'service/api/mymeeting';
import type { Member } from 'types/myMeeting';

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
  const router = useRouter();
  const queryClient = useQueryClient();

  // 데스크탑 뷰에서 유저 프로필 보기
  const handleOpenProfileModal = (
    e: React.MouseEvent<HTMLButtonElement>,
    member: Member,
  ) => {
    e.stopPropagation();
    router.push(
      `/my-meeting/my/profile?meetingId=${meetingId}&userId=${member.userId}&memberStatus=${member.memberStatus}`,
    );
  };

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

  // 맴버 명단 보기
  const handleShowMemberList = () => {
    queryClient.setQueryData(
      ['mymeeting', 'memberList', meetingId],
      memberList,
    );
    router.push(
      `/my-meeting/my/user-list?meetingId=${meetingId}&type=${showPublicSelect ? 'created' : 'joined'}`,
    );
  };

  const { data: currentUser, isLoading } = useBannerQueries();
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
                    <Tag
                      variant={member.memberStatus}
                      className="w-[49px] justify-center"
                    />
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

      {/* <div className="flex flex-1 gap-[16px]"> */}
      <Button
        variant="outline"
        className="flex h-[40px] flex-1 md:h-[46px] lg:hidden"
        onClick={handleShowMemberList}
      >
        맴버 명단 보기
      </Button>
      {showPublicSelect && (
        <PublicSelect isPublic={isPublic} meetingId={meetingId} />
      )}
    </div>
    // </div>
  );
};

export default CardRightSection;
