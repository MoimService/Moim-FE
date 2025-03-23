import Chip from '@/components/ui/Chip';
import { POSITION_OPTIONS } from 'constants/mypage/mypageConstant';

import { UserPosition } from '../../type-clyde/auth/acount';

export const PositionSelect = ({
  position,
  setPosition,
}: {
  position: UserPosition;
  setPosition: (value: UserPosition) => void;
}) => {
  // '선택 안함' 옵션 제외하고 직무 옵션만 필터링 (필요한 경우)
  const positionOptions = POSITION_OPTIONS.filter(
    (option) => option.value !== '선택 안함',
  );

  return (
    <div className="flex w-full gap-[8px]">
      {positionOptions.map((option) => (
        <Chip
          key={option.value}
          className="flex-1 hover:cursor-pointer"
          isActive={position === option.value}
          onClick={() => setPosition(option.value)}
        >
          {option.label}
        </Chip>
      ))}
    </div>
  );
};
