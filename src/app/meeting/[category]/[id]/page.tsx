import FloatingButtonGroup from '@/components/common/FloatingButtonGroup';
import ReviewAvgCard from '@/components/common/review/ReviewAvgCard';
import { commentKeys } from '@/hooks/queries/useCommentQueries';
import { meetingKeys } from '@/hooks/queries/useMeetingQueries';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import {
  Comment,
  getCommentsCount,
  getCommentsMeeting,
} from 'service/api/comment';
import { getMeetingDetail, getMeetingDetailManager } from 'service/api/meeting';
import { Paginated } from 'types/meeting';

import BackButton from '../../_features/BackButton';
import CardWrapper from '../../_features/CardWrapper';
import ContentLabel from '../../_features/ContextLabel';
import MeetingInfo from '../../_features/MeetingInfo';
import ReviewInput from '../../_features/ReviewInput';
import ReviewList from '../../_features/ReviewList';
import UserInfo from '../../_features/UserInfo';

export default async function page({ params }: { params: { id: string } }) {
  const meetingId = parseInt(params.id);
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: meetingKeys.detailInfo(meetingId),
      queryFn: () => getMeetingDetail(meetingId),
    }),
    queryClient.prefetchQuery({
      queryKey: meetingKeys.detailInfoUser(meetingId),
      queryFn: () => getMeetingDetailManager(meetingId),
    }),
    queryClient.prefetchQuery({
      queryKey: commentKeys.count(meetingId),
      queryFn: () => getCommentsCount(meetingId),
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: commentKeys.comments(meetingId),
      queryFn: ({ pageParam }) => getCommentsMeeting(meetingId, pageParam),
      getNextPageParam: (lastPage: Paginated<Comment>) =>
        lastPage.nextCursor ?? false,
      initialPageParam: 0,
    }),
  ]);

  return (
    <div className="flex flex-col gap-[48px]">
      <FloatingButtonGroup />
      <BackButton />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="flex flex-col gap-[48px] p-[16px] md:px-[48px]">
          <CardWrapper meetingId={meetingId} />
          <UserInfo meetingId={meetingId} />
          <MeetingInfo meetingId={meetingId} />
          <ContentLabel>리뷰</ContentLabel>
          <ReviewAvgCard meetingId={meetingId} />
          <ReviewInput meetingId={meetingId} />
          <ReviewList meetingId={meetingId} />
        </div>
      </HydrationBoundary>
    </div>
  );
}
