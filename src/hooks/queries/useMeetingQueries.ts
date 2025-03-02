import { useQuery } from '@tanstack/react-query';
import { getMeetingDetail, getMeetingDetailManager } from 'service/api/meeting';

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
