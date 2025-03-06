'use client';

import { Button } from '@/components/ui/Button';
import { useUpdateSkillsMutation } from '@/hooks/mutations/useMyPageMutation';
// Button 컴포넌트 import 추가
import { useProfileQuery } from '@/hooks/queries/useMyPageQueries';
import useTechSelection from '@/hooks/useTechSelection';
import { getIconColor, getIconsByCategory } from '@/util/getIconDetail';
import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { CategoryType } from 'types/techStack';

import CategoryTabs from '../../../../components/ui/tech-stack/tech-stack-components/CategoryTabs';
import SelectedTechList from '../../../../components/ui/tech-stack/tech-stack-components/SelectedTechList';
import TechButtonList from '../../../../components/ui/tech-stack/tech-stack-components/TechButtonList';

interface TechStackEditProps {
  onEditComplete: () => void;
  maxSelections?: number;
}

const TechStackEdit = ({
  onEditComplete,
  maxSelections = 999,
}: TechStackEditProps) => {
  const queryClient = useQueryClient(); // 추가: 직접 queryClient 참조
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');

  // 초기화 여부를 추적하는 플래그
  const [isInitialized, setIsInitialized] = useState(false);

  // 커스텀 훅을 사용하여 프로필 데이터 가져오기
  const { data: profileData, isLoading } = useProfileQuery();

  // 기술 스택 업데이트 뮤테이션 훅 사용
  const { mutate: updateSkills, isPending: isUpdating } =
    useUpdateSkillsMutation();

  // 기술 선택 로직 훅 사용
  const {
    clickedButtons,
    selectedCount,
    selectedNames,
    handleButtonClick,
    handleReset,
    handleRemoveSelection,
    setInitialSelection,
  } = useTechSelection({
    maxSelections: maxSelections,
  });

  // 초기 스킬 설정 - 단 한 번만 실행되도록 개선
  useEffect(() => {
    if (!isInitialized && !isLoading && profileData?.data?.skillArray) {
      const skillArray = profileData.data.skillArray;
      if (skillArray.length > 0) {
        setInitialSelection(skillArray);
      }
      setIsInitialized(true); // 초기화 완료 표시
    }
  }, [profileData, isLoading, isInitialized, setInitialSelection]);

  // 저장 처리
  const handleSave = () => {
    updateSkills(selectedNames, {
      onSuccess: () => {
        // 추가: 성공 후 강제로 프로필 데이터를 다시 불러오기
        queryClient.invalidateQueries({ queryKey: ['profile'] });
        queryClient.refetchQueries({ queryKey: ['profile'] });
        onEditComplete();
      },
    });
  };

  if (isLoading) {
    return <div className="py-4 text-center">로딩 중...</div>;
  }

  return (
    <div className="rounded-lg border border-Cgray300 bg-BG p-[32px]">
      <div className="mb-4 flex items-center justify-between">
        <div className="typo-head3 text-main">기술 스택 편집</div>
      </div>

      {/* 선택된 기술 목록 */}
      <div className="mb-4">
        <SelectedTechList
          selectedNames={selectedNames}
          getIconColor={getIconColor}
          onRemove={handleRemoveSelection}
        />
      </div>

      {/* 카테고리 탭 */}
      <CategoryTabs
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onReset={handleReset}
        containerClassName="border border-none"
        resetButtonClassName=""
      />

      {/* 기술 버튼 목록 */}
      <TechButtonList
        icons={getIconsByCategory(activeCategory)}
        clickedButtons={clickedButtons}
        selectedCount={selectedCount}
        maxSelections={maxSelections}
        onButtonClick={handleButtonClick}
        className="bg-transparent"
      />

      <div className="mt-4 flex justify-between">
        <Button
          type="button"
          variant="outline"
          className="h-[40px] w-[140px] md:h-[46px]"
          onClick={onEditComplete}
        >
          취소
        </Button>
        <Button
          type="button"
          className="h-[40px] w-[140px] select-none md:h-[46px]"
          disabled={isUpdating}
          onClick={handleSave}
        >
          {isUpdating ? '저장 중...' : '변경사항 저장'}
        </Button>
      </div>
    </div>
  );
};

export default TechStackEdit;
