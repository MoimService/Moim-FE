import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  getMyMeetingManage,
  getMyMeetingMemberProfile,
} from 'service/api/mymeeting';

export const myMeetingKeys = {
  all: ['mymeeting'] as const,
  manage: () => [...myMeetingKeys.all, 'manage'] as const,
  memberProfile: (meetingId: number, userId: number) => [
    ...myMeetingKeys.all,
    'profile',
    { meetingId, userId },
  ],
};

export const useInfiniteMyMeetingManageQueries = (lastMeetingId: number) => {
  return useInfiniteQuery({
    queryKey: myMeetingKeys.manage(),
    queryFn: () => getMyMeetingManage(lastMeetingId),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextCursor ?? null;
    },
  });
};

// 특정 유저의 프로필 요청
export const useMyMeetingMemberProfileQuries = ({
  meetingId,
  userId,
}: {
  meetingId: number;
  userId: number;
}) => {
  const { data, error, isLoading } = useQuery({
    queryKey: myMeetingKeys.memberProfile(meetingId, userId),
    queryFn: () => getMyMeetingMemberProfile({ meetingId, userId }),
    enabled: userId !== undefined,
  });

  return { data, error, isLoading };
};
