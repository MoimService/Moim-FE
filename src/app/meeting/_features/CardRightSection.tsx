'use client';

import { Button } from '@/components/ui/Button';
import { getAccessToken } from '@/lib/serverActions';
import { getDDay } from '@/util/date';
import { translateCategoryNameToEng } from '@/util/searchFilter';
import { useRouter } from 'next/navigation';
import { MeetingDetail } from 'service/api/meeting';

const CardRightSection = ({ meeting }: { meeting: MeetingDetail }) => {
  const router = useRouter();

  const handleRegister = async () => {
    const token = await getAccessToken();

    // 로그인 전인지 확인
    if (!token) {
      router.push(
        `/meeting/${translateCategoryNameToEng(meeting.categoryTitle)}/${meeting.meetingId}/need-login`,
        { scroll: false },
      );
    } else {
      router.push(
        `/meeting/${translateCategoryNameToEng(meeting.categoryTitle)}/${meeting.meetingId}/register`,
        { scroll: false },
      );
    }
  };

  return (
    <div className="flex w-full flex-col justify-end gap-[24px] py-[16px] md:p-[16px] lg:h-[208px] lg:w-[318px]">
      <div className="md:ml-[8px] lg:ml-0">
        <p className="typo-head3 text-Cgray500">모임 시작</p>
        <div className="flex items-end">
          <p className="typo-head1 text-Cgray800">
            {getDDay(meeting.startdate)}
          </p>
          <p className="typo-button1 mb-2 ml-1 text-Cgray800">일</p>
        </div>
      </div>
      {!meeting.isMember ? (
        meeting.maxMember === meeting.memberCount ? (
          <Button className="w-full" disabled>
            인원이 꽉찼어요
          </Button>
        ) : (
          <Button className="w-full" onClick={handleRegister}>
            신청하기
          </Button>
        )
      ) : (
        <Button
          className="w-full"
          variant={'outline'}
          onClick={() =>
            router.push(
              `/meeting/${translateCategoryNameToEng(meeting.categoryTitle)}/${meeting.meetingId}/CANCEL`,
              { scroll: false },
            )
          }
        >
          신청 취소하기
        </Button>
      )}
    </div>
  );
};
export default CardRightSection;
