import { useInfiniteQuery } from '@tanstack/react-query';
import {
  getMyMeetingsWritableComments,
  getMyWrittenComments,
} from 'service/api/mycomments';

export const MY_COMMENT_KEY = {
  writable: ['mycomments', 'writable'] as const,
  written: ['mycomments', 'written'] as const,
};

export const useInfiniteWrittenMyCommentQueries = () => {
  return useInfiniteQuery({
    queryKey: MY_COMMENT_KEY.written,
    queryFn: ({ pageParam }) => getMyWrittenComments(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor ?? null;
    },
  });
};

export const useInfiniteWritableMyMeetingsQueries = () => {
  return useInfiniteQuery({
    queryKey: MY_COMMENT_KEY.writable,
    queryFn: ({ pageParam }) => getMyMeetingsWritableComments(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor ?? null;
    },
  });
};
