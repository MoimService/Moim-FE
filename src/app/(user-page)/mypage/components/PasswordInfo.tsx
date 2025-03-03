'use client';

import { Button } from '@/components/ui/Button';
import { useProfileQuery } from '@/hooks/queries/useMyPageQueries';

import SkeletonPasswordInfo from './skeletons/SkeletonPasswordInfo';

interface PasswordInfoProps {
  onEnableEdit: () => void;
}

const PasswordInfo = ({ onEnableEdit }: PasswordInfoProps) => {
  // 프로필 데이터를 가져오기 (이메일 등 필요한 정보를 표시하기 위함)
  const { data: profileData, isLoading } = useProfileQuery();

  // 로딩 중이면 로딩 표시
  if (isLoading) {
    return <SkeletonPasswordInfo />;
  }

  // 비밀번호 정보는 표시하지 않고, 이메일 정보는 표시할 수 있음
  const userEmail = profileData?.data?.email || '';

  return (
    <div className="w-full rounded-[16px] border border-Cgray300 p-[32px]">
      <div className="flex flex-col gap-[32px]">
        <div className="flex flex-col gap-[8px]">
          <div className="typo-head3 text-Cgray700">비밀번호</div>
        </div>

        <div className="flex justify-center md:justify-start">
          <Button
            variant="outline"
            className="h-[40px] w-[295px] md:h-[46px] md:w-[280px]"
            onClick={onEnableEdit}
          >
            비밀번호 변경
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PasswordInfo;
