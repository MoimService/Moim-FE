import { isLightColor } from '@/util/getIconDetail';
import React from 'react';
import { IconComponent } from 'types/techStack';

interface TechButtonProps {
  className?: string;
  icon: IconComponent;
  name: string;
  color: string;
  isClicked: boolean;
  isMaxReached: boolean;
  onClick: (name: string) => void;
}

const TechButton = ({
  className,
  icon: Icon,
  name,
  color,
  isClicked,
  isMaxReached,
  onClick,
}: TechButtonProps): JSX.Element => {
  // 색상이 흰색이면 클릭 시 검정색으로 변경
  const iconColor = isClicked && isLightColor(color) ? '#000000' : color;

  return (
    <button
      className={`flex items-center gap-1 rounded-full border px-2 py-1
  text-xs transition-all hover:shadow-md md:gap-2 md:px-3 md:py-1.5 md:text-sm
  ${isClicked ? 'bg-white' : ''}
  ${isMaxReached ? 'cursor-not-allowed opacity-50' : ''} ${className}`}
      onClick={() => onClick(name)}
      disabled={isMaxReached}
      type="button"
      title={isMaxReached ? '최대 5개까지만 선택할 수 있습니다' : ''}
    >
      {Icon ? <Icon size={16} color={iconColor} /> : null}
      <p style={{ color: iconColor }} className="font-medium">
        {name}
      </p>
    </button>
  );
};

export default TechButton;
