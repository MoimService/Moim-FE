import { RotateCcw } from 'lucide-react';
import React, { useState } from 'react';
import { CategoryType } from 'type-clyde/common/icon/techStacks';

import TabButton from './TabButton';

interface CategoryTabsProps {
  activeCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
  onReset: () => void;
  containerClassName?: string;
  resetButtonClassName?: string;
}

const CategoryTabs = ({
  activeCategory,
  onCategoryChange,
  onReset,
  containerClassName = '',
  resetButtonClassName = '',
}: CategoryTabsProps): JSX.Element => {
  // 아이콘 회전 애니메이션 상태 관리
  const [isRotating, setIsRotating] = useState(false);

  // 초기화 버튼 클릭 핸들러
  const handleResetClick = () => {
    setIsRotating(true);
    onReset();

    // 애니메이션 완료 후 상태 초기화
    setTimeout(() => {
      setIsRotating(false);
    }, 500);
  };

  const categories: Array<{
    id: CategoryType;
    label: string;
    smallText: string;
  }> = [
    { id: 'all', label: '전체', smallText: '전체' },
    { id: 'frontend', label: '프론트엔드', smallText: '프론트엔드' },
    { id: 'backend', label: '백엔드', smallText: '백엔드' },
    { id: 'design', label: '디자인', smallText: '디자인' },
  ];

  return (
    <div
      className={`relative flex items-center justify-between border-b ${containerClassName}`}
    >
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

      <div className="flex items-center">
        <button
          onClick={handleResetClick}
          className={`hover:bg-gray-700/30 flex items-center gap-1 rounded-full px-2 py-1 text-white ${resetButtonClassName}`}
          title="초기화"
          type="button"
        >
          <span className={`inline-block ${isRotating ? 'animate-spin' : ''}`}>
            <RotateCcw size={16} />
          </span>
          <span className="sm:hidden md:block">초기화</span>
        </button>
      </div>

      {/* 애니메이션 스타일 정의 */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
        .animate-spin {
          animation: spin 0.3s linear;
        }
      `}</style>
    </div>
  );
};

export default CategoryTabs;
