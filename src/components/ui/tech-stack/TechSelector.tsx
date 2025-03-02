import useTechSelection from '@/hooks/useTechSelection';
import { getIconColor, getIconsByCategory } from '@/util/getIconDetail';
import React, { useState } from 'react';
import { CategoryType } from 'types/techStack';

import CategoryTabs from './tech-stack-components/CategoryTabs';
import SelectedTechList from './tech-stack-components/SelectedTechList';
import TechButtonList from './tech-stack-components/TechButtonList';

interface TechSelectorProps {
  className?: string;
  maxSelections?: number;
  onSelectionChange?: (selection: string[]) => void;
}

const TechSelector = ({
  className,
  maxSelections = 5,
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
  } = useTechSelection({
    maxSelections,
    onSelectionChange,
  });

  // 현재 카테고리의 아이콘 가져오기
  const activeIcons = getIconsByCategory(activeCategory);

  return (
    <div className={`bg-gray-50 h-auto p-10 ${className}`}>
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
