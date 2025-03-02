'use client';

import useInfiniteScroll from '@/hooks/common/useInfiniteScroll';
import { useInfiniteGetComments } from '@/hooks/queries/useCommentQueries';

import ReviewItem from './ReviewItem';
import SkeletonReviewList from './skeletons/SkeletonReviewList';

const ReviewList = ({ meetingId }: { meetingId: number }) => {
  const {
    data: commentsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteGetComments(meetingId);

  const lastMeetingRef = useInfiniteScroll({
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  });

  if (isLoading || !commentsData) {
    return <SkeletonReviewList />;
  }

  return (
    <div className="flex flex-col  gap-[8px]">
      {commentsData.pages.map((page, pageIdx) => {
        return (
          <div key={pageIdx}>
            {page.content.map((comment) => (
              <div
                key={comment.commentId}
                ref={
                  page.nextCursor === comment.commentId ? lastMeetingRef : null
                }
              >
                <ReviewItem comment={comment} />
                <div className="h-[1px] bg-Cgray300 md:mx-[24px]" />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default ReviewList;
