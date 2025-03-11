'use client';

import HorizonCard from '@/components/ui/HorizonCard';
import useInfiniteScroll from '@/hooks/common/useInfiniteScroll';
import { useInfiniteMyMeetingParticipatedQueries } from '@/hooks/queries/useMyMeetingQueries';
import { useRouter } from 'next/navigation';

import CardRightSection from './CardRightSection';
import MeetingListSkeleton from './skeletons/SkeletonMeetingList';

const Participated = () => {
  const router = useRouter();

  // 참여한 모임 데이터 가져오기
  const {
    data: meetingData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteMyMeetingParticipatedQueries();

  // 무한 스크롤을 위한 ref
  const lastMeetingRef = useInfiniteScroll({
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage: !!hasNextPage,
  });

  // 로딩 중인 경우 스켈레톤 UI 표시
  if (isLoading || !meetingData) {
    return <MeetingListSkeleton />;
  }

  // 상세 페이지로 이동하는 핸들러
  const handleMoveDetailPage = (meetingId: number) => {
    /**
     * TODO
     * 추후 category 수정
     */
    router.push(`/meeting/study/${meetingId}`);
  };

  return (
    <div>
      {meetingData.pages.map((page, pageIdx) => (
        <div key={pageIdx}>
          {page.content.map((meeting) => (
            <div key={meeting.meetingId}>
              {/* 데스크탑 */}
              <div className="hidden border-b border-Cgray300 py-[42px] lg:flex">
                <HorizonCard
                  onClick={() => handleMoveDetailPage(meeting.meetingId)}
                  key={meeting.meetingId}
                  title={meeting.title}
                  thumbnailUrl={meeting.thumbnail}
                  location={meeting.location}
                  total={meeting.maxMember}
                  value={meeting.memberCount}
                  className="flex-row"
                  meetingId={meeting.meetingId}
                  category={''}
                >
                  <CardRightSection
                    memberList={meeting.memberList}
                    isPublic={meeting.isPublic}
                    className="hidden lg:flex"
                    meetingId={meeting.meetingId}
                  />
                </HorizonCard>
              </div>

              {/* 태블릿 */}
              <div className="hidden flex-col border-b border-Cgray300 py-[42px] md:flex lg:hidden">
                <HorizonCard
                  onClick={() => handleMoveDetailPage(meeting.meetingId)}
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
                  category={''}
                />
                <CardRightSection
                  memberList={meeting.memberList}
                  isPublic={meeting.isPublic}
                  className="flex lg:hidden"
                  meetingId={meeting.meetingId}
                />
              </div>

              {/* 모바일 */}
              <div className="flex flex-col border-b border-Cgray300 py-[42px] md:hidden">
                <HorizonCard
                  onClick={() => handleMoveDetailPage(meeting.meetingId)}
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
                  category={''}
                />
                <CardRightSection
                  memberList={meeting.memberList}
                  isPublic={meeting.isPublic}
                  className="flex lg:hidden"
                  meetingId={meeting.meetingId}
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
      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <div className="text-gray-500 animate-pulse text-white">
            로딩 중...
          </div>
        </div>
      )}

      {/* 데이터가 없는 경우 표시 */}
      {meetingData.pages[0].content.length === 0 && (
        <div className="text-gray-500 py-8 text-center text-white">
          참여한 모임이 없습니다.
        </div>
      )}

      {/* 더 이상 데이터가 없음을 표시 */}
      {!hasNextPage && meetingData.pages[0].content.length > 0 && (
        <div className="text-gray-500 py-4 text-center text-white">
          모든 모임을 불러왔습니다.
        </div>
      )}
    </div>
  );
};

export default Participated;
