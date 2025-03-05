import FloatingButtonGroup from '@/components/common/FloatingButtonGroup';
import ReviewAvgCard from '@/components/common/review/ReviewAvgCard';

import BackButton from '../../_features/BackButton';
import CardWrapper from '../../_features/CardWrapper';
import ContentLabel from '../../_features/ContextLabel';
import MeetingInfo from '../../_features/MeetingInfo';
import ReviewInput from '../../_features/ReviewInput';
import ReviewList from '../../_features/ReviewList';
import UserInfo from '../../_features/UserInfo';

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
