'use client';

import ReviewItem from '@/app/meeting/_features/ReviewItem';
import HorizonCard from '@/components/ui/HorizonCard';
import useInfiniteScroll from '@/hooks/common/useInfiniteScroll';
import { useInfiniteWrittenMyCommentQueries } from '@/hooks/queries/useMyCommentQueries';
import { translateCategoryNameToEng } from '@/util/searchFilter';
import { useRouter } from 'next/navigation';
import { MyComment } from 'type-clyde/meeting/comment';

import MeetingListSkeleton from './skeletons/SkeletonMeetingList';

const Written = () => {
  const router = useRouter();
  const {
    data: commentData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteWrittenMyCommentQueries();

  const allComments: MyComment[] =
    commentData?.pages.flatMap((page) => page.content) || [];

  const lastMeetingRef = useInfiniteScroll({
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  });

  if (error) {
    <div className="bg-main text-white">
      에러가 발생했습니다. <hr />
      다시 시도해주세요.
    </div>;
  }

  if (isLoading) {
    return <MeetingListSkeleton />;
  }

  const handleMoveDetailPage = (meetingId: number, category: string) => {
    const categoryEng = translateCategoryNameToEng(category);
    router.push(`/meeting/${categoryEng}/${meetingId}`);
  };

  return (
    <div>
      {/* 데이터가 없는 경우 표시 */}
      {allComments.length === 0 && (
        <div className="typo-head3 flex h-[60vh] w-full items-center justify-center text-center text-Cgray500">
          <div>
            <p className="mb-2">작성한 리뷰가 없습니다.</p>
            <p>모임에 참여하고 리뷰를 작성해보세요!</p>
          </div>
        </div>
      )}

      <div>
        {allComments.map((comment) => (
          <div key={comment.meetingId}>
            {/* 데스크탑 */}
            <div className="flex hidden flex-col  border-b border-Cgray300 py-[42px] lg:flex">
              <HorizonCard
                onClick={() =>
                  handleMoveDetailPage(comment.meetingId, comment.categoryTitle)
                }
                key={comment.meetingId}
                title={comment.meetingTitle}
                thumbnailUrl={comment.thumbnail}
                location={comment.location}
                total={comment.maxMember}
                value={comment.memberCount}
                className="flex-row p-0"
                meetingId={comment.meetingId}
                showLikeButton={false}
                category={''}
              ></HorizonCard>
              <ReviewItem
                comment={comment}
                isMine={true}
                className="px-6"
              ></ReviewItem>
            </div>

            {/* 태블릿 */}
            <div className="hidden flex-col border-b border-Cgray300 py-[42px] md:flex lg:hidden">
              <HorizonCard
                onClick={() =>
                  handleMoveDetailPage(comment.meetingId, comment.categoryTitle)
                }
                key={comment.meetingId}
                title={comment.meetingTitle}
                thumbnailUrl={comment.thumbnail}
                location={comment.location}
                total={comment.maxMember}
                value={comment.memberCount}
                thumbnailHeight={160}
                thumbnailWidth={160}
                className="p-0"
                meetingId={comment.meetingId}
                showLikeButton={false}
                category={''}
              />
              <ReviewItem
                comment={comment}
                isMine={true}
                className="px-6"
              ></ReviewItem>
            </div>

            {/* 모바일 */}
            <div className="flex flex-col border-b border-Cgray300 py-[42px] md:hidden">
              <HorizonCard
                onClick={() =>
                  handleMoveDetailPage(comment.meetingId, comment.categoryTitle)
                }
                key={comment.meetingId}
                title={comment.meetingTitle}
                thumbnailUrl={comment.thumbnail}
                location={comment.location}
                total={comment.maxMember}
                value={comment.memberCount}
                thumbnailHeight={80}
                thumbnailWidth={80}
                className=""
                meetingId={comment.meetingId}
                category={''}
                showLikeButton={false}
              />
              <ReviewItem
                comment={comment}
                isMine={true}
                className="px-6"
              ></ReviewItem>
            </div>
          </div>
        ))}

        {/* 무한 스크롤을 위한 별도의 Observer 요소 */}
        {hasNextPage && (
          <div
            ref={lastMeetingRef}
            className="h-20 w-full"
            id="infinite-scroll-trigger"
          />
        )}
      </div>
    </div>
  );
};
export default Written;
