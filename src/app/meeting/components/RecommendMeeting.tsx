'use client';

import HorizonCard from '@/components/ui/HorizonCard';
import VerticalCard from '@/components/ui/VerticalCard';
import { useTopMeetings } from '@/hooks/queries/useMeetingQueries';
import { ITopMeeting } from 'types/meeting';

import RecommendMeetingSkeleton from './skeleton/RecommentMeetingSkeleton';

const RecommendMeeting = () => {
  const { data: meetings, isLoading, error } = useTopMeetings('모각코');

  if (isLoading) {
    return <RecommendMeetingSkeleton />;
  }

  if (error) {
    return <div className="typo-head1 text-white">에러 발생</div>;
  }

  return (
    <>
      <div className="typo-head1 mb-6 px-4 text-Cgray800">Deving 추천 모임</div>

      {/* 웹뷰, 테블릿 */}
      <div
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#a0aec0 transparent',
        }}
        className="hidden overflow-hidden overflow-x-auto pb-4 md:flex lg:flex"
      >
        {meetings?.map((meeting: ITopMeeting) => (
          <VerticalCard
            key={meeting.meetingId}
            title={meeting.title}
            thumbnailUrl={meeting.thumbnail}
            location={meeting.location}
            isLike={meeting.isLike}
            total={meeting.maxMember}
            value={meeting.memberCount}
          />
        ))}
      </div>

      {/* 모바일 */}
      <div className="flex flex-col md:hidden lg:hidden">
        {meetings?.map((meeting: ITopMeeting) => (
          <HorizonCard
            className="h-[130px]"
            key={meeting.meetingId}
            thumbnailHeight={80}
            thumbnailWidth={80}
            title={meeting.title}
            thumbnailUrl={meeting.thumbnail}
            location={meeting.location}
            isLike={meeting.isLike}
            total={meeting.maxMember}
            value={meeting.memberCount}
          />
        ))}
      </div>
    </>
  );
};

export default RecommendMeeting;
