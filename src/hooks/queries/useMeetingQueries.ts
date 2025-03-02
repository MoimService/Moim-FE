import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  getMeetingDetail,
  getMeetingDetailManager,
  getMeetings,
  getTopMeetings,
} from 'service/api/meeting';
import type { CategoryTitle, IMeetingSearchCondition } from 'types/meeting';

const MEETING_QUERY_KEYS = {
  topMeetings: (category: string) => ['topMeetings', category] as const, // 카테고리별 추천모임 쿼리키 분리
  meetings: (category: string) => ['meetings', category] as const, // 카테고리별 모임 쿼리키 분리
  meetingId: (id: string, category: string) =>
    [...MEETING_QUERY_KEYS.meetings(category), id] as const,
};

const useTopMeetings = (category: CategoryTitle, options = {}) => {
  return useQuery({
    queryKey: MEETING_QUERY_KEYS.topMeetings(category),
    queryFn: () => getTopMeetings(category),
    ...options,
  });
};

const useInfiniteSearchMeetings = (
  category: CategoryTitle,
  searchQueryObj: IMeetingSearchCondition,
  option = {},
) => {
  return useInfiniteQuery({
    queryKey: MEETING_QUERY_KEYS.meetings(category),
    queryFn: ({ pageParam = 0 }) =>
      getMeetings(pageParam, category, searchQueryObj),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage?.nextCursor;
    },
    ...option,
  });
};

// query key
export const meetingKeys = {
  all: ['meeting'] as const,
  detailInfo: (id: number) => [...meetingKeys.all, id, 'detail'] as const,
  detailInfoUser: (id: number) => [...meetingKeys.all, id, 'manager'] as const,
};

export const useDetailQueries = (id: number) => {
  const { data, error, isLoading } = useQuery({
    queryKey: meetingKeys.detailInfo(id),
    queryFn: () => getMeetingDetail(id),
  });

  return { data, error, isLoading };
};

// 디테일의 유저,,, ,어떻게 관리...?
export const useDetailUserQueries = (id: number) => {
  const { data, error, isLoading } = useQuery({
    queryKey: meetingKeys.detailInfoUser(id),
    queryFn: () => getMeetingDetailManager(id),
  });

  return { data, error, isLoading };
};

export { MEETING_QUERY_KEYS, useTopMeetings, useInfiniteSearchMeetings };
