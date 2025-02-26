import ReviewAvgCard from '@/components/common/review/ReviewAvgCard';
import { meetingKeys } from '@/hooks/queries/useMeetingQueries';
import { QueryClient } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';

import CardWarpper from '../../components/CardWrapper';
import MeetingInfo from '../../components/MeetingInfo';
import ReviewInput from '../../components/ReviewInput';
import ReviewList from '../../components/ReviewList';
import UserInfo from '../../components/UserInfo';

export default function page({ params }: { params: { id: string } }) {
  console.log('params: ', params);

  const queryClient = new QueryClient();
  const meetingId = parseInt(params.id);

  // 서버에서 react query 데이터를 미리 받아오기
  //   queryClient.prefetchQuery({
  //     queryKey: meetingKeys.detailInfo(meetingId),
  //     queryFn: () => getMeetingDetail(meetingId),
  //   });

  return (
    <div className="flex flex-col gap-[48px]">
      <div className="mt-[40px]">
        <ArrowLeft className="h-[24px] w-[24px] text-Cgray700" />
      </div>
      <div className="flex flex-col gap-[48px]">
        <CardWarpper meetingId={meetingId} />
        <UserInfo meetingId={meetingId} />
        <MeetingInfo meetingId={meetingId} />
      </div>
      <div className="flex flex-col gap-[48px] p-[16px] sm:px-[48px]">
        <div className="mb-[-24px] flex items-center gap-[8px]">
          <div className="h-[14px] w-[2px] bg-Cgray700" />
          <h3 className="typo-head3 text-Cgray700">리뷰</h3>
        </div>
        <ReviewAvgCard meetingId={meetingId} />
        <ReviewInput meetingId={meetingId} />
        <ReviewList meetingId={meetingId} />
      </div>
    </div>
  );
}
