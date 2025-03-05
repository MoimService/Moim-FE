'use client';

import TechButton from '@/components/ui/tech-stack/tech-stack-components/TechButton';
import { useDetailUserQueries } from '@/hooks/queries/useMeetingQueries';
import { getIconComponent } from '@/util/getIconDetail';
import Image from 'next/image';

import SkeletonUserInfo from './skeletons/SkeletonUserInfo';

const UserInfo = ({ meetingId }: { meetingId: number }) => {
  const { data, isLoading, error } = useDetailUserQueries(meetingId);

  if (isLoading || !data) {
    return <SkeletonUserInfo />;
  }

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex items-center gap-[16px]">
        <div className="relative h-[80px] w-[80px] shrink-0">
          <Image
            src={data.profilePic}
            fill
            className="object-cover"
            alt="유저 프로필"
          />
        </div>
        <div className="flex flex-col gap-[12px]">
          <h3 className="typo-head3 text-Cgray800">{data.name}</h3>
          <p className="typo-body1 text-Cgray700">{data.intro}</p>
        </div>
      </div>

      <div className="flex flex-col gap-[8px] px-[8px]">
        <div className="flex gap-[8px]">
          <p className="typo-head4 w-[56px] text-main">Email</p>
          <p className="typo-body1 text-Cgray700">{data.email}</p>
        </div>
        <div className="flex gap-[8px]">
          <p className="typo-head4 w-[56px] text-main">연락처</p>
          <p className="typo-body1 text-Cgray700">{data.phone}</p>
        </div>
      </div>
      <div className="ml-[8px] flex gap-[6px] text-Cgray500">
        <div className="flex flex-wrap gap-2">
          {data.skillArray &&
            data.skillArray?.length > 0 &&
            data.skillArray.map((skill) => (
              <TechButton
                className="h-6"
                key={skill}
                name={skill}
                icon={getIconComponent(skill)}
                color={'#333'}
                isClicked={true}
                isMaxReached={false}
                onClick={() => {}}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
export default UserInfo;
