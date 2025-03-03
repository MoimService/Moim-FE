'use client';

import HorizonCard from '@/components/ui/HorizonCard';
import useInfiniteScroll from '@/hooks/common/useInfiniteScroll';
import { useInfiniteMyMeetingManageQueries } from '@/hooks/queries/useMyMeetingQueries';
import { useState } from 'react';

import CardRightSection from './CardRightSection';

const Created = () => {
  const [lastMeetingId, setLastMeetingId] = useState(0);

  const {
    data: meetingData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteMyMeetingManageQueries(lastMeetingId);

  const lastMeetingRef = useInfiniteScroll({
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  });

  if (isLoading || !meetingData) {
    return <p>loading...</p>;
  }

  console.log('meetingData::: ', meetingData);

  return (
    <div>
      {meetingData.pages.map((page, pageIdx) => (
        <div key={pageIdx}>
          {page.content.map((meeting) => (
            <div key={meeting.meetingId}>
              {/* 데스크탑 */}
              <div className="hidden lg:flex">
                <HorizonCard
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
              <div className="hidden flex-col md:flex lg:hidden">
                <HorizonCard
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
              <div className="flex flex-col md:hidden">
                <HorizonCard
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
    </div>
  );
};
export default Created;
