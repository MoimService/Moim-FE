'use client';

import { useCommentsMeetingQueires } from '@/hooks/queries/useCommentQueries';

import ReviewItem from './ReviewItem';
import SkeletonReviewList from './skeletons/SkeletonReviewList';

const ReviewList = ({ meetingId }: { meetingId: number }) => {
  const {
    data: commentsData,
    isLoading,
    error,
  } = useCommentsMeetingQueires(meetingId);
  if (isLoading || !commentsData) {
    return <SkeletonReviewList />;
  }
  const comments = commentsData.content;

  console.log('comments: ', comments);
  return (
    <div className="flex flex-col gap-[8px]">
      {comments?.map((comment) => (
        <div key={comment.commentId}>
          <ReviewItem comment={comment} />
          <div className="h-[1px] bg-Cgray300 sm:mx-[24px]" />
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
