import { useToast } from '@/components/common/ToastContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { postComment } from 'service/api/comment';

import { commentKeys } from '../queries/useCommentQueries';

const useCommentMutation = (meetingId: number) => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ req }: { req: { score: number; content: string } }) =>
      postComment(meetingId, req),
    onSuccess: async (res) => {
      // onSuccessCallback?.();
      showToast('댓글 작성이 완료되었어요.');
      queryClient.invalidateQueries({
        queryKey: commentKeys.comments(meetingId),
      });
    },
    onError: (error: AxiosError) => {
      if (error.response?.status) {
        showToast('모임 참여자만 댓글 작성이 가능합니다.', 'error');
      }
    },
  });
};

export { useCommentMutation };
