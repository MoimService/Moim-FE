import { RotateCcw } from 'lucide-react';
import React from 'react';
import { CategoryType } from 'types/techStack';

import TabButton from './TabButton';

interface CategoryTabsProps {
  activeCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
  onReset: () => void;
}

const CategoryTabs = ({
  activeCategory,
  onCategoryChange,
  onReset,
}: CategoryTabsProps): JSX.Element => {
  const categories: Array<{
    id: CategoryType;
    label: string;
    smallText: string;
  }> = [
    { id: 'all', label: '전체', smallText: 'All' },
    { id: 'frontend', label: '프론트엔드', smallText: 'Front' },
    { id: 'backend', label: '백엔드', smallText: 'Back' },
    { id: 'design', label: '디자인', smallText: 'UI/UX' },
  ];

  return (
    <div className="flex items-center justify-between border-b">
      <div className="flex text-white">
        {categories.map((category) => (
          <TabButton
            key={category.id}
            active={activeCategory === category.id}
            onClick={() => onCategoryChange(category.id)}
            smallText={category.smallText}
          >
            {category.label}
          </TabButton>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onReset}
          className="hover:bg-gray-700/30 flex items-center gap-1 rounded-full px-2 py-1 text-white sm:px-3"
          title="초기화"
        >
          <RotateCcw size={16} />
          <span className="hidden sm:inline">초기화</span>
        </button>
      </div>
    </div>
  );
};

export default CategoryTabs;
