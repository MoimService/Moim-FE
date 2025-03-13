import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
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
import { QUERY_KEYS } from '../queries/useMyPageQueries';

// 프로필 정보 업데이트 커스텀 훅
export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IProfileUpdateRequest) => updateProfile(data),
    onSuccess: () => {
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
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.profile() });
    },
  });
};
