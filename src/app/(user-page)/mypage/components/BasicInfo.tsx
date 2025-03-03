import { Button } from '@/components/ui/Button';
import { useQuery } from '@tanstack/react-query';

import { getProfile } from '../../../../service/api/mypageProfile';
import SkeletonBasicInfo from './skeletons/SkeletonBasicInfo';

interface BasicInfoProps {
  onEnableEdit: () => void;
}

const BasicInfo = ({ onEnableEdit }: BasicInfoProps) => {
  // tanstack query를 사용하여 사용자 프로필 데이터 불러오기
  const { data, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  // 사용자 데이터 포맷팅
  const userData = {
    name: data?.data?.name || '',
    intro: data?.data?.intro || '',
    position: data?.data?.position || '',
    gender: data?.data?.gender || '',
    age: data?.data?.age || '',
    location: data?.data?.location || '',
  };

  // 로딩 중이면 로딩 표시
  if (isLoading) {
    return <SkeletonBasicInfo />;
  }

  // 오류가 발생하면 오류 메시지 표시
  if (error) {
    return (
      <div className="text-red-500 p-4 text-center">
        데이터를 불러오는데 실패했습니다.
      </div>
    );
  }

  return (
    <div className="w-full rounded-[16px] border border-Cgray300 p-[32px]">
      <div className="flex flex-col gap-[32px]">
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="name-input" className="typo-head3 text-Cgray700">
            이름
          </label>
          <input
            id="name-input"
            type="text"
            value={userData.name}
            readOnly
            className="typo-button1 h-[50px] rounded-[8px] border-b border-Cgray300 bg-transparent py-2 pl-[16px] text-Cgray700 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="intro-input" className="typo-head3 text-Cgray700">
            소개글
          </label>
          <textarea
            id="intro-input"
            rows={3}
            value={userData.intro}
            readOnly
            className="h-[140px] resize-none rounded-[8px] border-b border-Cgray300 bg-transparent py-2 pl-[16px] text-Cgray700 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="position-input" className="typo-head3 text-Cgray700">
            포지션
          </label>
          <input
            id="position-input"
            type="text"
            value={userData.position}
            readOnly
            className="typo-button1 h-[50px] rounded-[8px] border-b border-Cgray300 bg-transparent py-2 pl-[16px] text-Cgray700 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="gender-input" className="typo-head3 text-Cgray700">
            성별
          </label>
          <input
            id="gender-input"
            type="text"
            value={userData.gender}
            readOnly
            className="typo-button1 h-[50px] rounded-[8px] border-b border-Cgray300 bg-transparent py-2 pl-[16px] text-Cgray700 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="age-input" className="typo-head3 text-Cgray700">
            연령대
          </label>
          <input
            id="age-input"
            type="text"
            value={userData.age}
            readOnly
            className="typo-button1 h-[50px] rounded-[8px] border-b border-Cgray300 bg-transparent py-2 pl-[16px] text-Cgray700 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="area-input" className="typo-head3 text-Cgray700">
            지역
          </label>
          <input
            id="area-input"
            type="text"
            value={userData.location}
            readOnly
            className="typo-button1 h-[50px] rounded-[8px] border-b border-Cgray300 bg-transparent py-2 pl-[16px] text-Cgray700 focus:outline-none"
          />
        </div>
        <div className="flex justify-center md:justify-start">
          <Button
            variant="outline"
            className="h-[40px] w-[295px] md:h-[46px] md:w-[280px]"
            onClick={onEnableEdit}
          >
            사용자 정보 변경
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
