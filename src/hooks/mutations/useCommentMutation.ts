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
        queryKey: commentKeys.commentInfo(meetingId),
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
// 생각해 봤는데 우리 너무 가끔 만나는 것 같아서 서운할 때도 있어요 앞으로 좀 더 자주만나요
