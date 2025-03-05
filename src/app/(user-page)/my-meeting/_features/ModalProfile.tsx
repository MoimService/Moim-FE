import Description from '@/components/common/Description';
import { useMyMeetingMemberProfileQuries } from '@/hooks/queries/useMyMeetingQueries';
import Image from 'next/image';
import React from 'react';

const ModalProfile = ({
  userId,
  meetingId,
}: {
  userId: number | undefined;
  meetingId: number;
}) => {
  const {
    data: user,
    isLoading,
    error,
  } = useMyMeetingMemberProfileQuries({
    meetingId,
    userId: userId!,
  });

  if (isLoading || !user) {
    return <div>로딩중</div>;
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex gap-4">
        <Image
          width={80}
          height={80}
          src={user.profilePic}
          alt="유저 프로필"
          className="h-[80px] w-[80px] rounded-[16px]"
        />
        <div className="flex flex-col gap-[12px]">
          <h3 className="typo-head3 text-Cgray800">{user.name}</h3>
          <p className="typo-body1 text-Cgray700">{user.intro}</p>
        </div>
      </div>
      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-col gap-2 pl-2">
          <Description label="Email" value={user.email} />
          <Description label="연락처" value={user.contactResponse?.phone} />
          <Description label="연락처2" value={user.contactResponse?.github} />
          <Description label="연락처3" value={user.contactResponse?.kakao} />
        </div>
        <div className="flex flex-col gap-2 pl-2">
          <Description label="포지션" value={user.position} />
          <Description label="기술스택">
            <div className=" flex flex-wrap gap-[6px] text-Cgray500">
              <div className="typo-caption1 rounded-[8px] bg-disable px-[8px] py-[4px]">
                자바스크립트
              </div>
              <div className="typo-caption1 rounded-[8px] bg-disable px-[8px] py-[4px]">
                자바스크립트
              </div>
              <div className="typo-caption1 rounded-[8px] bg-disable px-[8px] py-[4px]">
                자바스크립트
              </div>
              <div className="typo-caption1 rounded-[8px] bg-disable px-[8px] py-[4px]">
                자바스크립트
              </div>
              <div className="typo-caption1 rounded-[8px] bg-disable px-[8px] py-[4px]">
                자바스크립트
              </div>
            </div>
          </Description>
        </div>
        <div className="flex flex-col gap-2 pl-2">
          <Description label="성별" value={user.gender} />
          <Description label="연령대" value={user.age} />
          <Description label="지역" value={user.location} />
        </div>
        <div className="pl-2">
          <Description label="인삿말" value={user.intro} />
        </div>
      </div>
    </div>
  );
};

export default ModalProfile;
