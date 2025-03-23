'use client';

import HorizonCard from '@/components/ui/HorizonCard';
import useInfiniteScroll from '@/hooks/common/useInfiniteScroll';
import { useInfiniteWritableMyMeetingsQueries } from '@/hooks/queries/useMyCommentQueries';
import { translateCategoryNameToEng } from '@/util/searchFilter';
import { useRouter } from 'next/navigation';
import { MyComment } from 'type-clyde/meeting/comment';

import MeetingListSkeleton from './skeletons/SkeletonMeetingList';

const Writable = () => {
  const router = useRouter();
  const {
    data: meetingData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteWritableMyMeetingsQueries();

  const allMeetings: MyComment[] =
    meetingData?.pages.flatMap((page) => page.content) || [];

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
      {allMeetings.length === 0 && (
        <div className="typo-head3 flex h-[60vh] w-full items-center justify-center text-center text-Cgray500">
          <div>
            <p className="mb-2">리뷰 작성 가능한 모임이 없습니다.</p>
            <p>모임에 참여하고 리뷰를 작성해보세요!</p>
          </div>
        </div>
      )}

      <div>
        {allMeetings.map((meeting) => (
          <div key={meeting.meetingId}>
            {/* 데스크탑 */}
            <div className="hidden border-b border-Cgray300 py-[42px] lg:flex">
              <HorizonCard
                onClick={() =>
                  handleMoveDetailPage(meeting.meetingId, meeting.categoryTitle)
                }
                key={meeting.meetingId}
                title={meeting.meetingTitle}
                thumbnailUrl={meeting.thumbnail}
                location={meeting.location}
                total={meeting.maxMember}
                value={meeting.memberCount}
                className="flex-row"
                showLikeButton={false}
                meetingId={meeting.meetingId}
                category={''}
              ></HorizonCard>
            </div>

            {/* 태블릿 */}
            <div className="hidden flex-col border-b border-Cgray300 py-[42px] md:flex lg:hidden">
              <HorizonCard
                onClick={() =>
                  handleMoveDetailPage(meeting.meetingId, meeting.categoryTitle)
                }
                key={meeting.meetingId}
                title={meeting.meetingTitle}
                thumbnailUrl={meeting.thumbnail}
                location={meeting.location}
                total={meeting.maxMember}
                value={meeting.memberCount}
                thumbnailHeight={160}
                thumbnailWidth={160}
                meetingId={meeting.meetingId}
                category={''}
                showLikeButton={false}
              />
            </div>

            {/* 모바일 */}
            <div className="flex flex-col border-b border-Cgray300 py-[42px] md:hidden">
              <HorizonCard
                onClick={() =>
                  handleMoveDetailPage(meeting.meetingId, meeting.categoryTitle)
                }
                key={meeting.meetingId}
                title={meeting.meetingTitle}
                thumbnailUrl={meeting.thumbnail}
                location={meeting.location}
                total={meeting.maxMember}
                value={meeting.memberCount}
                thumbnailHeight={80}
                thumbnailWidth={80}
                meetingId={meeting.meetingId}
                category={''}
                showLikeButton={false}
              />
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

export default Writable;
