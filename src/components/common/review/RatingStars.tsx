import StarIcon from '@/assets/icon/Star';
import React from 'react';

interface RatingStarsProps {
  rating: number;
  size?: number;
  className?: string;
}

const RatingStars = ({ rating, size = 24, className }: RatingStarsProps) => {
  // 소수점 한자리까지만 계산
  const ratingRounded = Math.round(rating * 10) / 10;
  const fullStars = Math.floor(ratingRounded);
  const hasHalfStar = ratingRounded % 1 >= 0.5;

  return (
    <div className={`flex gap-1 ${className || ''}`}>
      {[...Array(5)].map((_, index) => {
        let variant: 'outline' | 'filled' | 'half' = 'outline';

        if (index < fullStars) {
          variant = 'filled';
        } else if (index === fullStars && hasHalfStar) {
          variant = 'half';
        }

        return <StarIcon key={index} variant={variant} size={size} />;
      })}
    </div>
  );
};

export default RatingStars;
