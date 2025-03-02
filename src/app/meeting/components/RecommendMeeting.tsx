'use client';

import HorizonCard from '@/components/ui/HorizonCard';
import VerticalCard from '@/components/ui/VerticalCard';
import { useTopMeetings } from '@/hooks/queries/useMeetingQueries';
import { translateCategoryNameToKor } from '@/util/searchFilter';
import { useParams, useRouter } from 'next/navigation';
import type { TopMeeting } from 'types/meeting';

import RecommendMeetingSkeleton from './skeleton/RecommentMeetingSkeleton';

const RecommendMeeting = () => {
  const { category } = useParams();
  const router = useRouter();

  const categoryStr = Array.isArray(category) ? category[0] : category;
  const {
    data: meetings,
    isLoading,
    error,
  } = useTopMeetings(translateCategoryNameToKor(categoryStr));

  if (isLoading) {
    return <RecommendMeetingSkeleton />;
  }

  if (error) {
    return <div className="typo-head1 text-white">에러 발생</div>;
  }

  const handleMoveDetailPage = (id: number) => {
    router.push(`/meeting/${category}/${id}`);
  };

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
        {meetings?.map((meeting: TopMeeting) => (
          <VerticalCard
            onClick={handleMoveDetailPage}
            category={translateCategoryNameToKor(categoryStr)}
            key={meeting.meetingId}
            meetingId={meeting.meetingId}
            title={meeting.title}
            thumbnailUrl={meeting.thumbnail}
            location={meeting.location}
            isLike={meeting.isLike}
            likesCount={meeting.likesCount}
            total={meeting.maxMember}
            value={meeting.memberCount}
          />
        ))}
      </div>

      {/* 모바일 */}
      <div className="flex flex-col md:hidden lg:hidden">
        {meetings?.map((meeting: TopMeeting) => (
          <HorizonCard
            onClick={handleMoveDetailPage}
            category={translateCategoryNameToKor(categoryStr)}
            className="h-[130px]"
            key={meeting.meetingId}
            meetingId={meeting.meetingId}
            thumbnailHeight={80}
            thumbnailWidth={80}
            title={meeting.title}
            thumbnailUrl={meeting.thumbnail}
            location={meeting.location}
            isLike={meeting.isLike}
            likesCount={meeting.likesCount}
            total={meeting.maxMember}
            value={meeting.memberCount}
          />
        ))}
      </div>
    </>
  );
};

export default RecommendMeeting;
