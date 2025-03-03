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
    <div className="rounded-lg border border-Cgray300 bg-Cgray200 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="typo-head3 text-Cgray700">기술 스택</h3>
        <button
          onClick={onEnableEdit}
          className="hover:text-main-dark text-sm text-main"
        >
          편집
        </button>
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
                  <Icon size={14} color={color} />
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
        <p className="text-sm text-Cgray500">등록된 기술 스택이 없습니다.</p>
      )}
    </div>
  );
};

export default TechStackInfo;
