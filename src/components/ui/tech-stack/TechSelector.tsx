import useTechSelection from '@/hooks/useTechSelection';
import { getIconColor, getIconsByCategory } from '@/util/getIconDetail';
import React, { useEffect, useState } from 'react';
import { CategoryType } from 'type-clyde/common/icon/techStacks';

import CategoryTabs from './tech-stack-components/CategoryTabs';
import SelectedTechList from './tech-stack-components/SelectedTechList';
import TechButtonList from './tech-stack-components/TechButtonList';

interface TechSelectorProps {
  className?: string;
  id?: string;
  maxSelections?: number;
  initialSelection?: string[]; // 초기 선택 값 추가
  onSelectionChange?: (selection: string[]) => void;
}

const TechSelector = ({
  className,
  id,
  maxSelections = 5,
  initialSelection = [], // 기본값 빈 배열
  onSelectionChange,
}: TechSelectorProps): JSX.Element => {
  // 현재 선택된 카테고리 상태
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');

  // 기술 선택 로직 훅 사용
  const {
    clickedButtons,
    selectedCount,
    selectedNames,
    handleButtonClick,
    handleReset,
    handleRemoveSelection,
    setInitialSelection, // 기존 훅에서 가져온 함수 사용
  } = useTechSelection({
    maxSelections,
    onSelectionChange,
  });

  // 초기 선택 값이 변경될 때 적용
  useEffect(() => {
    // 문자열 배열을 얕은 비교가 아닌 깊은 비교로 확인
    const currentSelectionStr = JSON.stringify(selectedNames.sort());
    const initialSelectionStr = JSON.stringify([...initialSelection].sort());

    if (
      initialSelection &&
      initialSelection.length > 0 &&
      currentSelectionStr !== initialSelectionStr
    ) {
      setInitialSelection(initialSelection);
    }
  }, [initialSelection, selectedNames, setInitialSelection]); // 의존성에 문자열화된 값 사용

  // 현재 카테고리의 아이콘 가져오기
  const activeIcons = getIconsByCategory(activeCategory);

  return (
    <div id={id} className={`bg-gray-50 h-auto p-10 ${className}`}>
      <div className="mx-auto">
        {/* 선택된 기술 목록 */}
        <SelectedTechList
          selectedNames={selectedNames}
          getIconColor={getIconColor}
          onRemove={handleRemoveSelection}
        />

        {/* 카테고리 탭 */}
        <CategoryTabs
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onReset={handleReset}
        />

        {/* 기술 버튼 목록 */}
        <TechButtonList
          icons={activeIcons}
          clickedButtons={clickedButtons}
          selectedCount={selectedCount}
          maxSelections={maxSelections}
          onButtonClick={handleButtonClick}
        />
      </div>
    </div>
  );
};

export default TechSelector;
