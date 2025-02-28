import { Heart } from 'lucide-react';
import Image from 'next/image';

import { Button } from './Button';
import { Progress } from './Progress';

interface VerticalCardProps {
  children?: React.ReactElement;
  className?: string;
  thumbnailUrl?: string;
  thumbnailWidth?: number;
  thumbnailHeight?: number;
  title: string;
  location: string;
  onClickLike?: () => void;
  isLike?: boolean;
  value: number;
  total: number;
}

const VerticalCard = ({
  children,
  className = '',
  thumbnailUrl = '/thumbnail.jpg',
  thumbnailHeight = 252,
  thumbnailWidth = 303,
  title,
  location,
  onClickLike,
  isLike = false,
  value,
  total = 100,
}: VerticalCardProps) => {
  const handleLikeButton = () => {
    if (onClickLike) onClickLike();
  };

  return (
    <div className={`h-[410px] w-[335px] bg-BG p-4 ${className}`}>
      <div
        className={'relative'}
        style={{ height: `${thumbnailHeight}px`, width: `${thumbnailWidth}px` }}
      >
        <Image
          className="rounded-[20px] object-cover"
          alt="card_thumbnail"
          fill
          src={thumbnailUrl === '' ? '/thumbnail.jpg' : thumbnailUrl}
        />
      </div>
      <div className="mt-4">
        <div className="typo-head2 flex justify-between truncate text-Cgray800 ">
          <span className="max-w-[270px] overflow-hidden truncate text-ellipsis whitespace-nowrap">
            {title}
          </span>
          <Button
            className=" h-auto w-auto"
            variant="text"
            size="sm"
            onClick={handleLikeButton}
            icon={
              <Heart
                style={{ width: '24px', height: '24px' }}
                className={isLike ? 'fill-main' : 'stroke-Cgray500'}
              />
            }
          ></Button>
        </div>
        <div className="mt-3 truncate text-Cgray500">
          <span className="max-w-[270px] overflow-hidden truncate text-ellipsis whitespace-nowrap">
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

export default VerticalCard;
