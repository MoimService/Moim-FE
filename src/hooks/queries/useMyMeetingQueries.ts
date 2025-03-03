import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getMyMeetingManage } from 'service/api/mymeeting';

export const myMeetingKeys = {
  all: ['mymeeting'] as const,
  manage: () => [...myMeetingKeys.all, 'manage'] as const,
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
