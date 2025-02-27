import { getIconComponent } from '@/util/getIconDetail';
import { X } from 'lucide-react';
import React from 'react';

interface SelectedTechButtonProps {
  name: string;
  color: string;
  onRemove: (name: string) => void;
}

const SelectedTechButton = ({
  name,
  color,
  onRemove,
}: SelectedTechButtonProps): JSX.Element => {
  // 현재 기술의 아이콘 컴포넌트
  const TechIcon = getIconComponent(name);

  return (
    <div className="flex items-center gap-1 rounded-full border border-main bg-Cgray100 px-2 py-1 shadow-sm">
      <span className="flex-shrink-0">
        <TechIcon size={14} color={color} />
      </span>
      <span
        style={{ color }}
        className="hidden cursor-default text-xs font-medium sm:inline-block"
      >
        {name}
      </span>

      {/* 삭제 버튼 */}
      <button
        onClick={() => onRemove(name)}
        className="hover:bg-gray-200 ml-1 cursor-pointer rounded-full p-1"
        aria-label={`${name} 선택 해제`}
      >
        <X size={12} className="text-white" />
      </button>
    </div>
  );
};

export default SelectedTechButton;
