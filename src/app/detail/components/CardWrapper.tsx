'use client';

import { Button } from '@/components/ui/Button';
import HorizonCard from '@/components/ui/HorizonCard';

const CardWarpper = () => {
  const meeting = {
    meetingId: 1,
    title: 'JavaScript Study Group',
    thumbnail:
      'https://helpx.adobe.com/content/dam/help/en/photoshop/using/quick-actions/remove-background-before-qa1.png',
    location: 'Seoul Seoul Seoul Seoul Seoul Seoul Seoul Seoul Seoul ',
    memberCount: 5,
    maxMember: 10,
    isLike: true,
  };
  // 신청 전
  const beforeSubmit = () => {
    return (
      <div className="flex h-[208px] w-[318px] flex-col justify-end gap-[24px]">
        <div>
          <p className="typo-head3 text-Cgray500">남은 시간</p>
          <p className="typo-head1 text-Cgray800">2일 14시간</p>
        </div>
        <Button className="w-full">신청하기</Button>
      </div>
    );
  };

  return (
    <div className="w-full p-[16px]">
      <HorizonCard
        title={meeting.title}
        thumbnailUrl={meeting.thumbnail}
        location={meeting.location}
        isLike={meeting.isLike}
        total={meeting.maxMember}
        value={meeting.memberCount}
      >
        {beforeSubmit()}
      </HorizonCard>
    </div>
  );
};
export default CardWarpper;
