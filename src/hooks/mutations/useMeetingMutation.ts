import { useToast } from '@/components/common/ToastContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  cancelLikeMeeting,
  deleteMeetingCancel,
  likeMeeting,
} from 'service/api/meeting';
import { deleteMeetingQuit, postMeetingRegister } from 'service/api/meeting';

import { meetingKeys } from '../queries/useMeetingQueries';

const useLikeMeeting = (meetingId: number, options = {}) => {
  return useMutation({
    mutationFn: () => likeMeeting(meetingId),
    ...options,
  });
};

const useCancelLikeMeeting = (meetingId: number, options = {}) => {
  return useMutation({
    mutationFn: () => cancelLikeMeeting(meetingId),
    ...options,
  });
};

const useMeetingMutation = ({
  onSuccessCallback,
  onErrorCallback,
  meetingId,
}: {
  onSuccessCallback: (status: string) => void;
  onErrorCallback: () => void;
  meetingId: number;
}) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: ({ message }: { message: string }) =>
      postMeetingRegister({ meetingId, message }),
    onSuccess: async (res) => {
      onSuccessCallback(res.status);
      queryClient.invalidateQueries({
        queryKey: meetingKeys.detailInfo(meetingId),
      });
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 400) {
        showToast(
          '이미 모임에 참가 신청을 했습니다. 승인을 기다려주세요.',
          'error',
        );
      }
      onErrorCallback();
    },
  });
};

// 모임 탈퇴
const useMeetingQuitMutation = ({ meetingId }: { meetingId: number }) => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteMeetingQuit(meetingId),
    onSuccess: async (res) => {
      showToast('모임에서 탈퇴하였습니다', 'success');
      queryClient.invalidateQueries({
        queryKey: meetingKeys.detailInfo(meetingId),
      });
    },
    onError: (error: AxiosError) => {
      showToast('모임 탈퇴에 실패하였습니다.', 'error');
    },
  });
};

// 모임 신청 취소
const useMeetingCancelMutation = ({ meetingId }: { meetingId: number }) => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteMeetingCancel(meetingId),
    onSuccess: async (res) => {
      showToast('모임 신청이 취소되었습니다.', 'success');
      queryClient.invalidateQueries({
        queryKey: meetingKeys.detailInfo(meetingId),
      });
    },
    onError: (error: AxiosError) => {
      showToast('모임 신청 취소에 실패하였습니다.', 'error');
    },
  });
};

export {
  useMeetingMutation,
  useMeetingQuitMutation,
  useLikeMeeting,
  useCancelLikeMeeting,
  useMeetingCancelMutation,
};
