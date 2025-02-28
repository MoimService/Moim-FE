import { Heart } from 'lucide-react';
import Image from 'next/image';

import { Button } from './Button';
import { Progress } from './Progress';

interface HorizonCardProps {
  title: string;
  location: string;
  value: number;
  total: number;
  children?: React.ReactElement;
  className?: string;
  thumbnailUrl?: string;
  thumbnailWidth?: number;
  thumbnailHeight?: number;
  onClickLike?: () => void;
  isLike?: boolean;
}

const HorizonCard = ({
  children,
  className = '',
  thumbnailUrl = '/thumbnail.jpg',
  thumbnailHeight = 208,
  thumbnailWidth = 252,
  title,
  location,
  onClickLike,
  isLike = false,
  value,
  total = 100,
}: HorizonCardProps) => {
  const handleLikeButton = () => {
    if (onClickLike) onClickLike();
  };

  return (
    <div
      className={`relative flex h-[240px] w-full flex-shrink-0 bg-BG p-4 ${className}`}
    >
      <Button
        className="absolute right-4 top-4 h-auto w-auto"
        variant="text"
        size="sm"
        onClick={handleLikeButton}
        icon={
          <Heart
            style={{ width: '24px', height: '24px' }}
            className={isLike ? 'fill-main' : ''}
          />
        }
      ></Button>

      <div
        className="relative"
        style={{ height: `${thumbnailHeight}px`, width: `${thumbnailWidth}px` }}
      >
        <Image
          className="rounded-[20px] object-cover"
          alt="card_thumbnail"
          fill
          src={thumbnailUrl === '' ? '/thumbnail.jpg' : thumbnailUrl}
        />
      </div>
      <div className="flex-1 px-[40px]">
        <div className="typo-head2 flex justify-between text-Cgray800">
          <span className="max-w-[950px] overflow-hidden truncate text-ellipsis whitespace-nowrap">
            {title}
          </span>
        </div>
        <div className="mt-3 flex truncate text-Cgray500">
          <span className="max-w-[950px] overflow-hidden truncate text-ellipsis whitespace-nowrap">
            {location}
          </span>
        </div>
        <Progress
          className="mt-4 overflow-hidden"
          value={value}
          total={total}
        />
      </div>
      {children}
    </div>
  );
};

export default HorizonCard;
