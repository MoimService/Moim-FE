import Profile from '@/assets/icon/profile.svg';
import { Button } from '@/components/ui/Button';
import { getDDay } from '@/util/date';
import React from 'react';

interface MeetingExtraInfoProps {
  lastMeetingRef?: React.RefCallback<Element> | null;
  name: string;
  startDate: string;
  meetingId: number;
  variant?: 'desktop' | 'tablet' | 'mobile';
  onClick?: () => void;
}

const MeetingExtraInfo = ({
  lastMeetingRef,
  name,
  startDate,
  variant = 'desktop',
  onClick,
}: MeetingExtraInfoProps) => {
  // 스타일 조건 분기
  const isTablet = variant === 'tablet';
  const isMobile = variant === 'mobile';

  return (
    <div ref={lastMeetingRef} className="mt-5 md:w-[180px] lg:w-[318px]">
      <div className="hidden flex-col md:flex lg:flex lg:flex-row">
        <div className="mr-6 flex w-[147px] flex-col">
          <div
            className={
              isMobile
                ? 'typo-caption1 text-Cgray500'
                : 'typo-head3 text-Cgray500'
            }
          >
            모임장
          </div>
          <div
            className={`${isMobile ? 'typo-button2' : 'typo-head2'} mt-1 flex items-center text-Cgray700`}
          >
            <Profile className="mr-2 h-10 w-10 flex-shrink-0" />
            <span className="truncate text-ellipsis">{name}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <div
            className={
              isMobile
                ? 'typo-caption1 text-Cgray500'
                : 'typo-head3 text-Cgray500'
            }
          >
            모임시작
          </div>
          <div
            className={`${isMobile ? 'typo-button2' : 'typo-head1'} mt-1 text-Cgray700`}
          >
            {getDDay(startDate)}
          </div>
        </div>
      </div>

      <Button
        className={`mt-6 ${isTablet ? 'mt-[7px]' : 'mt-6'} ${
          isMobile
            ? 'h-[46px] w-[311px]'
            : 'md:h-[40px] md:w-[180px] lg:h-[46px] lg:w-[318px]'
        }`}
        onClick={onClick}
      >
        신청하기
      </Button>
    </div>
  );
};

export default MeetingExtraInfo;
