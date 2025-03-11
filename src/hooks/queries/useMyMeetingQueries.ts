import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  getMyMeetingManage,
  getMyMeetingMemberProfile,
} from 'service/api/mymeeting';
import { getMyMeetingParticipated } from 'service/api/mymeeting';
import { Paginated } from 'types/meeting';
import { IMyMeetingManage } from 'types/myMeeting';

export const myMeetingKeys = {
  all: ['mymeeting'] as const,
  manage: () => [...myMeetingKeys.all, 'manage'] as const,
  participated: () => [...myMeetingKeys.all, 'participated'] as const,
  memberProfile: (meetingId: number, userId: number) => [
    ...myMeetingKeys.all,
    'profile',
    { meetingId, userId },
  ],
};

export const useInfiniteMyMeetingManageQueries = () => {
  return useInfiniteQuery({
    queryKey: myMeetingKeys.manage(),
    queryFn: ({ pageParam }) => getMyMeetingManage(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage: Paginated<IMyMeetingManage>) => {
      return lastPage.nextCursor ?? null;
    },
  });
};

export const useInfiniteMyMeetingParticipatedQueries = () => {
  return useInfiniteQuery({
    queryKey: myMeetingKeys.participated(),
    queryFn: ({ pageParam }) => getMyMeetingParticipated(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage: Paginated<IMyMeetingManage>) => {
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
