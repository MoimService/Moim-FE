import { useToast } from '@/components/common/ToastContext';
import {
  useCancelLikeMeeting,
  useLikeMeeting,
} from '@/hooks/mutations/useMeetingMutation';
import {
  MEETING_QUERY_KEYS,
  meetingKeys,
} from '@/hooks/queries/useMeetingQueries';
import { getAccessToken } from '@/lib/serverActions';
import { InfiniteData, QueryKey, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import {
  IMeetingSearchCondition,
  Paginated,
  SearchMeeting,
  TopMeeting,
} from 'types/meeting';

interface UseLikeHandlerProps {
  meetingId: number;
  category: string;
  searchQuery?: IMeetingSearchCondition;
  onAuthRequired?: () => void;
}

const useLikeHandler = ({
  meetingId,
  category,
  searchQuery,
  onAuthRequired,
}: UseLikeHandlerProps) => {
  const queryClient = useQueryClient();

  // 배열 캐시 업데이트
  const updateCacheArray = <T extends TopMeeting>(
    queryKey: QueryKey,
    meetingId: number,
    isLike: boolean,
    likeCount: number,
  ) => {
    queryClient.setQueryData<T[]>(queryKey, (oldData) => {
      if (!oldData) return oldData;
      return oldData.map((meeting) =>
        meeting.meetingId === meetingId
          ? { ...meeting, isLike, likesCount: meeting.likesCount + likeCount }
          : meeting,
      );
    });
  };

  // 객체 캐시 업데이트
  const updateCacheObject = <T extends SearchMeeting>(
    queryKey: QueryKey,
    isLike: boolean,
    likeCount: number,
  ) => {
    queryClient.setQueryData<T>(queryKey, (oldData) => {
      if (!oldData) return oldData;
      return { ...oldData, isLike, likesCount: oldData.likesCount + likeCount };
    });
  };

  // 무한스크롤 배열 캐시 업데이트
  const updateInfiniteMeetingCache = <T extends SearchMeeting>(
    queryKey: QueryKey,
    meetingId: number,
    isLike: boolean,
    likeCount: number,
  ) => {
    queryClient.setQueryData<InfiniteData<Paginated<T>>>(
      queryKey,
      (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            content: page.content.map((item) =>
              item.meetingId === meetingId
                ? { ...item, isLike, likesCount: item.likesCount + likeCount }
                : item,
            ),
          })),
        };
      },
    );
  };

  const { showToast } = useToast();
  const { id } = useParams();

  const { mutate: likeMutation } = useLikeMeeting(meetingId, {
    onMutate: () => {
      // 모임 목록
      if (category && searchQuery) {
        updateInfiniteMeetingCache<SearchMeeting>(
          MEETING_QUERY_KEYS.meetings(category, searchQuery),
          meetingId,
          true,
          1,
        );
        return;
      }

      // 추천모임
      if (category && !id) {
        updateCacheArray(
          MEETING_QUERY_KEYS.topMeetings(category),
          meetingId,
          true,
          1,
        );
        return;
      }

      // 상세모임
      if (id) {
        updateCacheObject(meetingKeys.detailInfo(meetingId), true, 1);
        return;
      }
    },
    onSuccess: () => {
      showToast('찜한 모임에 추가되었습니다!', 'success', { duration: 2000 });
    },
    onError: () => {
      // TODO: 내가 만든 모임 좋아요 할 경우 toast 문구 변경
      showToast('잠시 후 다시 시도해주세요', 'error', { duration: 3000 });

      // 모임 목록
      if (category && searchQuery) {
        updateInfiniteMeetingCache<SearchMeeting>(
          MEETING_QUERY_KEYS.meetings(category, searchQuery),
          meetingId,
          false,
          -1,
        );
        return;
      }

      // 추천모임
      if (category && !id) {
        updateCacheArray(
          MEETING_QUERY_KEYS.topMeetings(category),
          meetingId,
          false,
          -1,
        );
        return;
      }

      // 상세모임
      if (id) {
        updateCacheObject(meetingKeys.detailInfo(meetingId), false, -1);
        return;
      }
    },
  });

  const { mutate: cancelLikeMutation } = useCancelLikeMeeting(meetingId, {
    onMutate: () => {
      // 모임 목록
      if (category && searchQuery) {
        updateInfiniteMeetingCache<SearchMeeting>(
          MEETING_QUERY_KEYS.meetings(category, searchQuery),
          meetingId,
          false,
          -1,
        );
        return;
      }

      // 추천모임
      if (category && !id) {
        updateCacheArray(
          MEETING_QUERY_KEYS.topMeetings(category),
          meetingId,
          false,
          -1,
        );
        return;
      }

      // 상세모임
      if (id) {
        updateCacheObject(meetingKeys.detailInfo(meetingId), false, -1);
        return;
      }
    },
    onSuccess: () => {
      showToast('찜한 모임에서 삭제되었습니다!', 'success', { duration: 2000 });
    },
    onError: () => {
      // 오류 처리
      showToast('잠시 후 다시 시도해주세요', 'error', { duration: 3000 });

      // 모임 목록
      if (category && searchQuery) {
        updateInfiniteMeetingCache<SearchMeeting>(
          MEETING_QUERY_KEYS.meetings(category, searchQuery),
          meetingId,
          true,
          1,
        );
        return;
      }

      // 추천모임
      if (category && !id) {
        updateCacheArray(
          MEETING_QUERY_KEYS.topMeetings(category),
          meetingId,
          true,
          1,
        );
        return;
      }

      // 상세모임
      if (id) {
        updateCacheObject(meetingKeys.detailInfo(meetingId), true, 1);
        return;
      }
    },
  });

  // 좋아요 토글 함수
  const toggleLike = async (isLiked: boolean) => {
    const token = await getAccessToken();
    if (!token) {
      // 로그인 상태가 아니라면, onAuthRequired 콜백 실행
      if (onAuthRequired) {
        onAuthRequired();
      }
      return;
    }

    if (!isLiked) {
      likeMutation();
    } else {
      cancelLikeMutation();
    }
  };

  return { toggleLike };
};

export default useLikeHandler;
