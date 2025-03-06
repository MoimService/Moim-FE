import { QueryClient, useQuery } from '@tanstack/react-query';

import { getBanner, getProfile } from '../../service/api/mypageProfile';

// 마이페이지 관련 쿼리 키 정의
export const QUERY_KEYS = {
  all: ['mypage'] as const,
  profile: () => [...QUERY_KEYS.all, 'profile'] as const,
  skills: () => [...QUERY_KEYS.all, 'skills'] as const,
  contact: () => [...QUERY_KEYS.all, 'contact'] as const,
  banner: () => [...QUERY_KEYS.all, 'banner'] as const,
};

// 프로필 정보 prefetch 함수
export const prefetchProfileData = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.profile(),
    queryFn: getProfile,
    staleTime: 5 * 60 * 1000, // 5분 동안 fresh 상태 유지
  });
};

// 배너 정보 prefetch 함수
export const prefetchBannerData = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.banner(),
    queryFn: getBanner,
    staleTime: 5 * 60 * 1000, // 5분 동안 fresh 상태 유지
  });
};

// 프로필 정보 조회 커스텀 훅 - staleTime 추가
export const useProfileQuery = (options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.profile(),
    queryFn: getProfile,
    staleTime: 5 * 60 * 1000, // 5분 동안 fresh 상태 유지
    ...options,
  });
};

// banner 정보 불러오기
export const useBannerQueries = (options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.banner(),
    queryFn: () => getBanner(),
    staleTime: 5 * 60 * 1000, // 5분 동안 fresh 상태 유지
    ...options,
  });
};
