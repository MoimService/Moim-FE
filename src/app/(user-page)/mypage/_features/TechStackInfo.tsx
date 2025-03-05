import { Button } from '@/components/ui/Button';
import { useProfileQuery } from '@/hooks/queries/useMyPageQueries';
import { getIconColor, getIconComponent } from '@/util/getIconDetail';
import React from 'react';

import SkeletonTechStackInfo from './skeletons/SkeletonTechStackInfo';

interface TechStackInfoProps {
  onEnableEdit: () => void;
}

const TechStackInfo = ({ onEnableEdit }: TechStackInfoProps) => {
  // 커스텀 훅을 사용하여 프로필 데이터 가져오기
  const { data: profileData, isLoading } = useProfileQuery();

  // 사용자 스킬 데이터 (안전하게 기본값 지정)
  const userSkills = profileData?.data?.skillArray || [];

  if (isLoading) {
    return <SkeletonTechStackInfo />;
  }

  return (
    <div className="rounded-[16px] border border-Cgray300 bg-BG p-[32px]">
      <div className="mb-4 flex items-center justify-between">
        <div className="typo-head3 text-Cgray700">기술 스택</div>
      </div>

      {userSkills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {userSkills.map((skill) => {
            const color = getIconColor(skill);
            const Icon = getIconComponent(skill);
            return (
              <div
                key={skill}
                className="flex items-center gap-1 rounded-full border border-main bg-Cgray100 px-2 py-1 shadow-sm"
              >
                <span className="flex-shrink-0">
                  <Icon size={20} color={color} />
                </span>
                <span
                  style={{ color }}
                  className="cursor-default text-xs font-medium sm:inline-block"
                >
                  {skill}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <p className=" text-Cgray500">등록된 기술 스택이 없습니다.</p>
      )}
      <div className="flex justify-center pt-[32px] md:justify-start">
        <Button
          variant="outline"
          className="h-[40px] w-[295px] md:h-[46px] md:w-[280px]"
          onClick={onEnableEdit}
        >
          기술스택 변경
        </Button>
      </div>
    </div>
  );
};

export default TechStackInfo;
