'use client';

import HorizonCard from '@/components/ui/HorizonCard';
import useInfiniteScroll from '@/hooks/common/useInfiniteScroll';
import { useInfiniteMyMeetingLikesQueries } from '@/hooks/queries/useMyMeetingQueries';
import { translateCategoryNameToEng } from '@/util/searchFilter';
import { useRouter } from 'next/navigation';
import React from 'react';

import MeetingListSkeleton from './skeletons/SkeletonMeetingList';

const Likes = () => {
  const router = useRouter();

  const {
    data: meetingData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteMyMeetingLikesQueries();

  const lastMeetingRef = useInfiniteScroll({
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage: !!hasNextPage,
  });

  if (isLoading || !meetingData) {
    return <MeetingListSkeleton />;
  }

  return (
    <div>
      {meetingData.pages.map((page, pageIdx) => (
        <div key={pageIdx}>
          {page.content.map((meeting) => (
            <div key={meeting.meetingId}>
              {/* 데스크탑 */}
              <div className="hidden border-b border-Cgray300 py-[42px] lg:flex">
                <HorizonCard
                  onClick={() =>
                    router.push(
                      `/meeting/${translateCategoryNameToEng(meeting.categoryTitle)}/${meeting.meetingId}`,
                    )
                  }
                  key={meeting.meetingId}
                  title={meeting.title}
                  thumbnailUrl={meeting.thumbnail}
                  location={meeting.location}
                  total={meeting.maxMember}
                  value={meeting.memberCount}
                  className="flex-row"
                  meetingId={meeting.meetingId}
                  category={translateCategoryNameToEng(meeting.categoryTitle)}
                  isLike={true}
                  likesCount={meeting.likesCount}
                ></HorizonCard>
              </div>

              {/* 태블릿 */}
              <div className="hidden flex-col border-b border-Cgray300 py-[42px] md:flex lg:hidden">
                <HorizonCard
                  onClick={() =>
                    router.push(
                      `/meeting/${translateCategoryNameToEng(meeting.categoryTitle)}/${meeting.meetingId}`,
                    )
                  }
                  key={meeting.meetingId}
                  title={meeting.title}
                  thumbnailUrl={meeting.thumbnail}
                  location={meeting.location}
                  total={meeting.maxMember}
                  value={meeting.memberCount}
                  thumbnailHeight={160}
                  thumbnailWidth={160}
                  className=""
                  meetingId={meeting.meetingId}
                  category={translateCategoryNameToEng(meeting.categoryTitle)}
                  isLike={true}
                  likesCount={meeting.likesCount}
                />
              </div>

              {/* 모바일 */}
              <div className="flex flex-col border-b border-Cgray300 py-[42px] md:hidden">
                <HorizonCard
                  onClick={() =>
                    router.push(
                      `/meeting/${translateCategoryNameToEng(meeting.categoryTitle)}/${meeting.meetingId}`,
                    )
                  }
                  key={meeting.meetingId}
                  title={meeting.title}
                  thumbnailUrl={meeting.thumbnail}
                  location={meeting.location}
                  total={meeting.maxMember}
                  value={meeting.memberCount}
                  thumbnailHeight={80}
                  thumbnailWidth={80}
                  className=""
                  meetingId={meeting.meetingId}
                  category={translateCategoryNameToEng(meeting.categoryTitle)}
                  isLike={true}
                  likesCount={meeting.likesCount}
                />
              </div>
            </div>
          ))}
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

      {/* 추가 데이터 로딩 중 표시 */}
      {isFetchingNextPage && <MeetingListSkeleton />}

      {/* 데이터가 없는 경우 표시 */}
      {meetingData.pages[0].content.length === 0 && (
        <div className="typo-head3 flex h-[60vh] w-full items-center justify-center pt-[130px] text-center text-Cgray500">
          <div>
            <p className="mb-2">찜한 모임이 없어요.</p>
            <p>원하는 모임을 찜해보세요!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Likes;
