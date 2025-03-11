'use client';

import ModalPortal from '@/components/ui/modal/ModalPortal';
import { myMeetingKeys } from '@/hooks/queries/useMyMeetingQueries';
import { useBannerQueries } from '@/hooks/queries/useMyPageQueries';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { getMyMeetingMemberProfile } from 'service/api/mymeeting';
import { Paginated } from 'types/meeting';
import { IMyMeetingManage, Member } from 'types/myMeeting';

import ModalUserList from '../../../_features/ModalUserList';

export default function UserListModal({
  searchParams,
}: {
  searchParams: { meetingId: string; type: string };
}) {
  const router = useRouter();
  const meetingId = Number(searchParams.meetingId);
  const type = searchParams.type;

  const queryClient = useQueryClient();

  // 캐싱된 데이터 먼저 가져오기
  const cachedMemberList = queryClient.getQueryData<Member[]>([
    'mymeeting',
    'memberList',
    meetingId,
  ]);

  // 유저 정보 파악
  const { data: currentUser, isLoading, error } = useBannerQueries();

  if (!currentUser || isLoading || !cachedMemberList) return;

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

  return (
    <ModalPortal
      isOpen={true}
      onClose={() => router.back()}
      showOnly
      modalClassName="h-[590px] w-[520px] overflow-y-auto"
    >
      <ModalUserList
        meetingId={meetingId}
        memberList={cachedMemberList}
        currentUser={currentUser}
        handlePrefetchProfile={handlePrefetchProfile}
        showPublicSelect={type === 'created' && true}
      />
    </ModalPortal>
  );
}
