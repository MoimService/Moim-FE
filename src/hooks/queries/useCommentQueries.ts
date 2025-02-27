import { useQuery } from '@tanstack/react-query';
import { getCommentsCount, getCommentsMeeting } from 'service/api/comment';

export const commentKeys = {
  all: ['comments'] as const,
  commentInfo: (meetingId: number) => [...commentKeys.all, meetingId] as const,
  count: (meetingId: number) =>
    [...commentKeys.all, meetingId, 'count'] as const,
  comments: (meetingId: number) =>
    [...commentKeys.all, meetingId, 'comments'] as const,
};

export const useCommentsCountQueries = (meetingId: number) => {
  const { data, error, isLoading } = useQuery({
    queryKey: commentKeys.count(meetingId),
    queryFn: () => getCommentsCount(meetingId),
  });

  return { data, error, isLoading };
};

export const useCommentsMeetingQueires = (meetingId: number) => {
  const { data, error, isLoading } = useQuery({
    queryKey: commentKeys.comments(meetingId),
    queryFn: () => getCommentsMeeting(meetingId),
  });

  return { data, error, isLoading };
};
