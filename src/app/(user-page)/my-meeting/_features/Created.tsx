'use client';

import HorizonCard from '@/components/ui/HorizonCard';
import useInfiniteScroll from '@/hooks/common/useInfiniteScroll';
import { useInfiniteMyMeetingManageQueries } from '@/hooks/queries/useMyMeetingQueries';
import { useRouter } from 'next/navigation';

import CardRightSection from './CardRightSection';
import MeetingListSkeleton from './skeletons/SkeletonMeetingList';

const Created = () => {
  const router = useRouter();

  const {
    data: meetingData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteMyMeetingManageQueries();

  const lastMeetingRef = useInfiniteScroll({
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  });

  if (isLoading || !meetingData) {
    return <MeetingListSkeleton />;
  }

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
              <div
                className="hidden border-b border-Cgray300 py-[42px] lg:flex"
                ref={
                  page.nextCursor === meeting.meetingId ? lastMeetingRef : null
                }
              >
                <HorizonCard
                  onClick={handleMoveDetailPage}
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
              <div
                className="hidden flex-col border-b border-Cgray300 py-[42px] md:flex lg:hidden"
                ref={
                  page.nextCursor === meeting.meetingId ? lastMeetingRef : null
                }
              >
                <HorizonCard
                  onClick={handleMoveDetailPage}
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
              <div
                className="flex flex-col border-b border-Cgray300 py-[42px] md:hidden"
                ref={
                  page.nextCursor === meeting.meetingId ? lastMeetingRef : null
                }
              >
                <HorizonCard
                  onClick={handleMoveDetailPage}
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
    </div>
  );
};
export default Created;
