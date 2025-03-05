import { useToast } from '@/components/common/ToastContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { putExpel, putIsPublic, putMemberStatus } from 'service/api/mymeeting';

import { myMeetingKeys } from '../queries/useMyMeetingQueries';

const useMemberStatusMutation = (meetingId: number) => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      setMemberStatus,
      userId,
    }: {
      setMemberStatus: 'APPROVED' | 'REJECTED';
      userId: number;
    }) => putMemberStatus({ meetingId, userId, setMemberStatus }),
    onSuccess: (_, variables) => {
      if (variables.setMemberStatus === 'APPROVED') {
        showToast('해당 유저의 가입을 승낙했어요!', 'success');
      }
      if (variables.setMemberStatus === 'REJECTED') {
        showToast('해당 유저의 가입을 거절했어요!', 'error');
      }
      queryClient.invalidateQueries({
        queryKey: myMeetingKeys.manage(),
      });
      queryClient.invalidateQueries({
        queryKey: myMeetingKeys.memberProfile(meetingId, variables.userId),
      });
    },
    onError: (error: AxiosError) => {
      if (error.response?.status) {
        showToast('다시 시도해주세요.', 'error');
      }
    },
  });
};

// 내보내기
const useExpelMutation = (meetingId: number) => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      setMemberStatus,
      userId,
    }: {
      setMemberStatus: 'EXPEL';
      userId: number;
    }) => putExpel({ meetingId, userId, setMemberStatus }),
    onSuccess: (_, variables) => {
      showToast('해당 유저를 내보냈어요!', 'success');
      queryClient.invalidateQueries({
        queryKey: myMeetingKeys.manage(),
      });
      queryClient.invalidateQueries({
        queryKey: myMeetingKeys.memberProfile(meetingId, variables.userId),
      });
    },
    onError: (error: AxiosError) => {
      if (error.response?.status) {
        showToast('다시 시도해주세요.', 'error');
      }
    },
  });
};

// 공개 / 비공개 변경
const useChangePublic = (meetingId: number) => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (isPublic: boolean) => putIsPublic(meetingId),
    onSuccess: (data, variables) => {
      console.log('비공개 api 응답 확인 data: ', data);
      if (!data.isPublic) {
        showToast('해당 모임을 비공개로 바꿨어요!', 'success');
      } else {
        showToast('해당 모임을 공개로 바꿨어요!', 'success');
      }
      queryClient.invalidateQueries({
        queryKey: myMeetingKeys.manage(),
      });
    },
    onError: (error: AxiosError) => {
      if (error.response?.status) {
        showToast('다시 시도해주세요.', 'error');
      }
    },
  });
};

export { useMemberStatusMutation, useExpelMutation, useChangePublic };
