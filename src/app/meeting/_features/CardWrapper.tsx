'use client';

import HorizonCard from '@/components/ui/HorizonCard';
import VerticalCard from '@/components/ui/VerticalCard';
import { useDetailQueries } from '@/hooks/queries/useMeetingQueries';
import { translateCategoryNameToKor } from '@/util/searchFilter';
import { notFound, useParams } from 'next/navigation';

import CardRightSection from './CardRightSection';
import SkeletonMeetingTotalInfo from './skeletons/SkeletonMeetingTotalInfo';

const CardWrapper = ({ meetingId }: { meetingId: number }) => {
  const { data: meeting, isLoading, error } = useDetailQueries(meetingId);
  const { category } = useParams();
  const categoryStr = Array.isArray(category) ? category[0] : category;

  if (error) {
    notFound();
  }
  if (isLoading || !meeting) {
    return <SkeletonMeetingTotalInfo />;
  }

  return (
    <>
      {/* 모바일 */}
      <div className="m-[-16px] flex flex-col md:hidden lg:hidden">
        <VerticalCard
          meetingId={meetingId}
          category={translateCategoryNameToKor(categoryStr)}
          className="h-[650px] w-full"
          thumbnailHeight={252}
          thumbnailWidth={343}
          key={meeting.meetingId}
          title={meeting.title}
          thumbnailUrl={meeting.thumbnail}
          location={meeting.location}
          isLike={meeting.isLike}
          total={meeting.maxMember}
          value={meeting.memberCount}
          skills={meeting.meetingSkillArray}
        >
          <CardRightSection meeting={meeting} />
        </VerticalCard>
      </div>

      {/* 테블릿 */}
      <div className="m-[-16px] hidden w-full flex-col md:flex lg:hidden">
        <HorizonCard
          className="items-center"
          meetingId={meetingId}
          category={translateCategoryNameToKor(categoryStr)}
          key={meeting.meetingId}
          title={meeting.title}
          thumbnailUrl={meeting.thumbnail}
          thumbnailHeight={210}
          thumbnailWidth={252}
          location={meeting.location}
          isLike={meeting.isLike}
          total={meeting.maxMember}
          value={meeting.memberCount}
          skills={meeting.meetingSkillArray}
        />
        <CardRightSection meeting={meeting} />
      </div>

      {/* 데스크탑 */}
      <div className="m-[-16px] hidden w-full lg:flex">
        <HorizonCard
          title={meeting.title}
          meetingId={meetingId}
          category={translateCategoryNameToKor(categoryStr)}
          thumbnailUrl={meeting.thumbnail}
          location={meeting.location}
          isLike={meeting.isLike}
          total={meeting.maxMember}
          value={meeting.memberCount}
          skills={meeting.meetingSkillArray}
          className="flex-row"
        >
          <CardRightSection meeting={meeting} />
        </HorizonCard>
      </div>
    </>
  );
};
export default CardWrapper;
