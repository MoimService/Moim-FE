import FloatingButtonGroup from '@/components/common/FloatingButtonGroup';
import ReviewAvgCard from '@/components/common/review/ReviewAvgCard';

import BackButton from '../../components/BackButton';
import CardWrapper from '../../components/CardWrapper';
import ContentLabel from '../../components/ContextLabel';
import MeetingInfo from '../../components/MeetingInfo';
import ReviewInput from '../../components/ReviewInput';
import ReviewList from '../../components/ReviewList';
import UserInfo from '../../components/UserInfo';

export default function page({ params }: { params: { id: string } }) {
  const meetingId = parseInt(params.id);

  return (
    <div className="flex flex-col gap-[48px]">
      <FloatingButtonGroup />
      <BackButton />
      <div className="flex flex-col gap-[48px] p-[16px] md:px-[48px]">
        <CardWrapper meetingId={meetingId} />
        <UserInfo meetingId={meetingId} />
        <MeetingInfo meetingId={meetingId} />
        <ContentLabel>리뷰</ContentLabel>
        <ReviewAvgCard meetingId={meetingId} />
        <ReviewInput meetingId={meetingId} />
        <ReviewList meetingId={meetingId} />
      </div>
    </div>
  );
}
