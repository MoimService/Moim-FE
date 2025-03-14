import Description from '@/components/common/Description';
import TechButton from '@/components/ui/tech-stack/tech-stack-components/TechButton';
import { getIconComponent } from '@/util/getIconDetail';
import Image from 'next/image';
import React from 'react';
import { IMemberProfile } from 'types/myMeeting';

const ModalProfile = ({ user }: { user: IMemberProfile }) => {
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
            <div className="ml-[8px] flex gap-[6px] text-Cgray500">
              <div className="flex flex-wrap gap-2">
                {user.skillArray &&
                  user.skillArray?.length > 0 &&
                  user.skillArray.map((skill) => (
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
