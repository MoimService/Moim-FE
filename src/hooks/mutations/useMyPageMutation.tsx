import { useToast } from '@/components/common/ToastContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import {
  updateContactInfo,
  updatePassword,
  updateProfile,
  updateProfileImage,
  updateSkills,
} from '../../service/api/mypageProfile';
import { ErrorResponse, IProfileResponse } from '../../types/mypageTypes';
import { QUERY_KEYS } from '../queries/useMyPageQueries';

// 프로필 정보 업데이트 커스텀 훅
export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: updateProfile,

    onMutate: async (newProfileData) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.profile() });

      // 현재 캐시 저장
      const previousData = queryClient.getQueryData<IProfileResponse>(
        QUERY_KEYS.profile(),
      );

      if (previousData) {
        // 캐시 업데이트
        queryClient.setQueryData<IProfileResponse>(QUERY_KEYS.profile(), {
          ...previousData,
          data: {
            ...previousData.data,
            name: newProfileData.name,
            intro: newProfileData.intro,
            position: newProfileData.position,
            gender: newProfileData.gender,
            age: newProfileData.age,
            location: newProfileData.location,
          },
        });
      }

      return { previousData };
    },

    onError: (error, _, context) => {
      // 에러 메시지 표시
      showToast('기본 정보 업데이트에 실패했습니다.', 'error');

      // 롤백
      if (context?.previousData) {
        queryClient.setQueryData(QUERY_KEYS.profile(), context.previousData);
      }
    },

    onSuccess: () => {
      showToast('기본 정보가 성공적으로 업데이트되었습니다.', 'success');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.profile() });
    },
  });
};

// 연락처 정보 업데이트 커스텀 훅
export const useUpdateContactInfoMutation = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast(); // 토스트 메시지 훅 추가

  return useMutation({
    mutationFn: updateContactInfo,

    onMutate: async (newContactData) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.profile() });

      const previousData = queryClient.getQueryData<IProfileResponse>(
        QUERY_KEYS.profile(),
      );

      if (previousData) {
        queryClient.setQueryData<IProfileResponse>(QUERY_KEYS.profile(), {
          ...previousData,
          data: {
            ...previousData.data,
            contactResponse: {
              ...previousData.data.contactResponse,
              phone: newContactData.phone,
              github: newContactData.github,
              kakao: newContactData.kakao,
              blog: newContactData.blog,
            },
          },
        });
      }

      return { previousData };
    },

    // 실패 시 에러 메시지 표시 및 롤백
    onError: (error, _, context) => {
      // 실패 시 토스트 메시지 표시
      showToast('연락처 정보 업데이트에 실패했습니다.', 'error');

      // 이전 데이터로 롤백
      if (context?.previousData) {
        queryClient.setQueryData(QUERY_KEYS.profile(), context.previousData);
      }
    },

    // 성공 시 메시지 표시
    onSuccess: () => {
      showToast('연락처 정보가 성공적으로 업데이트되었습니다.', 'success');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.profile() });
    },
  });
};

// 프로필 이미지 업데이트 커스텀 훅
export const useUpdateProfileImageMutation = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: updateProfileImage,

    onMutate: async (file) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.profile() });

      const previousData = queryClient.getQueryData<IProfileResponse>(
        QUERY_KEYS.profile(),
      );

      // 파일을 임시 URL로 변환 (브라우저 메모리에 저장)
      const tempUrl = URL.createObjectURL(file);

      if (previousData) {
        queryClient.setQueryData<IProfileResponse>(QUERY_KEYS.profile(), {
          ...previousData,
          data: {
            ...previousData.data,
            profilePic: tempUrl, // 임시 URL로 이미지 경로 업데이트
          },
        });
      }

      return { previousData, tempUrl };
    },

    onError: (error, _, context) => {
      showToast('프로필 이미지 업로드에 실패했습니다.', 'error');

      // 이전 데이터로 롤백
      if (context?.previousData) {
        queryClient.setQueryData(QUERY_KEYS.profile(), context.previousData);
      }

      // 임시 URL 해제 (메모리 누수 방지)
      if (context?.tempUrl) {
        URL.revokeObjectURL(context.tempUrl);
      }
    },

    onSuccess: (_, __, context) => {
      showToast('프로필 이미지가 성공적으로 업데이트되었습니다.', 'success');

      // 성공 시에도 임시 URL 해제 필요
      if (context?.tempUrl) {
        URL.revokeObjectURL(context.tempUrl);
      }
    },

    onSettled: () => {
      // 서버에서 최신 이미지 URL 가져오기
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.profile() });
    },
  });
};

// 비밀번호 업데이트 커스텀 훅 - 낙관적 업데이트 적용
export const useUpdatePasswordMutation = () => {
  const { showToast } = useToast();

  return useMutation({
    mutationFn: updatePassword,

    onError: (error: AxiosError<ErrorResponse>) => {
      // 서버 에러 응답 구조에 따라 조건 확인
      const errorData = error.response?.data;

      const isPasswordMismatch =
        errorData?.message?.includes('password') ||
        errorData?.code === 'INVALID_PASSWORD' ||
        errorData?.message?.includes('비밀번호');

      if (isPasswordMismatch) {
        // 기타 오류에 대한 일반적인 메시지
        showToast('비밀번호 변경에 실패했습니다', 'error');
      }
    },

    onSuccess: () => {
      showToast('비밀번호가 성공적으로 변경되었습니다', 'success');
    },
  });
};

// 기술 스택 업데이트 커스텀 훅
export const useUpdateSkillsMutation = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: updateSkills,

    onMutate: async (newSkills) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.profile() });

      const previousData = queryClient.getQueryData<IProfileResponse>(
        QUERY_KEYS.profile(),
      );

      if (previousData) {
        queryClient.setQueryData<IProfileResponse>(QUERY_KEYS.profile(), {
          ...previousData,
          data: {
            ...previousData.data,
            skillArray: newSkills,
          },
        });
      }

      // 기술 스택 아이콘 즉시 렌더링을 위해 스킬 목록도 캐시
      queryClient.setQueryData(QUERY_KEYS.skills(), newSkills);

      return { previousData };
    },

    onError: (error, _, context) => {
      showToast('기술 스택 업데이트에 실패했습니다.', 'error');

      if (context?.previousData) {
        queryClient.setQueryData(QUERY_KEYS.profile(), context.previousData);
      }
    },

    onSuccess: () => {
      showToast('기술 스택이 성공적으로 업데이트되었습니다.', 'success');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.profile() });
    },
  });
};
