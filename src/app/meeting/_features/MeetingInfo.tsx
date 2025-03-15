'use client';

import { useDetailQueries } from '@/hooks/queries/useMeetingQueries';
import { formatDate } from '@/util/date';
import { notFound } from 'next/navigation';

import ContentLabel from './ContextLabel';
import SkeletonMeetingInfo from './skeletons/SkeletonMeetingInfo';

const MeetingInfo = ({ meetingId }: { meetingId: number }) => {
  const { data: meeting, isLoading, error } = useDetailQueries(meetingId);

  if (error) {
    notFound();
  }
  if (isLoading || !meeting) {
    return <SkeletonMeetingInfo />;
  }

  return (
    <div className="">
      <div className="flex flex-col gap-[24px] ">
        <ContentLabel>모임 설명</ContentLabel>

        <div className="flex flex-col gap-[8px] pl-[8px]">
          <div className="flex gap-[8px]">
            <p className="typo-head4 w-[56px] text-main">장소</p>
            <p className="typo-body1 text-Cgray700">{meeting.location}</p>
          </div>
          <div className="flex gap-[8px]">
            <p className="typo-head4 w-[56px] text-main">날짜</p>
            <p className="typo-body1 text-Cgray700">
              {formatDate(meeting.startdate)}
            </p>
          </div>
          <div className="flex gap-[8px]">
            <p className="typo-head4 w-[56px] text-main">모집정원</p>
            <p className="typo-body1 text-Cgray700">{meeting.maxMember}명</p>
          </div>
          <div className="flex gap-[8px]">
            <p className="typo-head4 w-[56px] text-main">가입방식</p>
            <p className="typo-body1 text-Cgray700">
              {!meeting.requireApproval ? '바로 가입' : '승인 필요'}
            </p>
          </div>
        </div>
        <p className="typo-body1 h-[200px] pl-[8px] text-Cgray800">
          {meeting.content}
        </p>
      </div>
    </div>
  );
};

export default MeetingInfo;
