import StarIcon from '@/assets/icon/Star';
import React, { Dispatch, SetStateAction } from 'react';

interface RatingStarsProps {
  size?: number;
  className?: string;
  selectedRating: number;
  setSelectedRating: Dispatch<SetStateAction<number>>;
}

const RatingStarsEdit = ({
  size = 24,
  className,
  selectedRating,
  setSelectedRating,
}: RatingStarsProps) => {
  const handleClick = (index: number, isHalf: boolean) => {
    const newRating = index + (isHalf ? 0.5 : 1);
    setSelectedRating(newRating);
  };

  return (
    <div className={`flex gap-1 ${className || ''}`}>
      {[...Array(5)].map((_, index) => {
        let variant: 'outline' | 'filled' | 'half' = 'outline';

        const displayRating = selectedRating;
        if (index < Math.floor(displayRating)) {
          variant = 'filled';
        } else if (
          index === Math.floor(displayRating) &&
          displayRating % 1 !== 0
        ) {
          variant = 'half';
        }

        return (
          <button
            key={index}
            className="relative h-[24px] w-[24px] cursor-pointer"
            onClick={(e) => {
              const isHalf =
                e.nativeEvent.offsetX < e.currentTarget.clientWidth / 2;
              handleClick(index, isHalf);
            }}
          >
            <StarIcon variant={variant} size={size} />
          </button>
        );
      })}
    </div>
  );
};

export default RatingStarsEdit;
