import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  getProfile,
  updateContactInfo,
  updatePassword,
  updateProfile,
  updateProfileImage,
  updateSkills,
} from '../../service/api/mypageProfile';
import {
  IContactInfoUpdateRequest,
  IPasswordUpdateRequest,
  IProfileUpdateRequest,
} from '../../types/mypageTypes';

// 마이페이지 관련 쿼리 키 정의
export const QUERY_KEYS = {
  all: ['mypage'] as const,
  profile: () => [...QUERY_KEYS.all, 'profile'] as const,
  skills: () => [...QUERY_KEYS.all, 'skills'] as const,
  contact: () => [...QUERY_KEYS.all, 'contact'] as const,
};

// 프로필 정보 조회 커스텀 훅
export const useProfileQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.profile(), // 기존 코드에서 사용하던 쿼리 키와 일치시킴
    queryFn: getProfile,
  });
};

// 프로필 정보 업데이트 커스텀 훅
export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IProfileUpdateRequest) => updateProfile(data),
    onSuccess: () => {
      // 성공 시 프로필 데이터 캐시 무효화
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.profile() });
    },
  });
};

// 연락처 정보 업데이트 커스텀 훅
export const useUpdateContactInfoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IContactInfoUpdateRequest) => updateContactInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.profile() });
    },
  });
};

// 프로필 이미지 업데이트 커스텀 훅
export const useUpdateProfileImageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => updateProfileImage(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.profile() });
    },
  });
};

// 비밀번호 업데이트 커스텀 훅
export const useUpdatePasswordMutation = () => {
  return useMutation({
    mutationFn: (data: IPasswordUpdateRequest) => updatePassword(data),
  });
};

// 기술 스택 업데이트 커스텀 훅
export const useUpdateSkillsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (skillArray: string[]) => updateSkills(skillArray),
    onSuccess: () => {
      // 명시적으로 캐시 무효화 강화
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.profile() });
      queryClient.refetchQueries({ queryKey: ['profile'] });
    },
  });
};
