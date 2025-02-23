import { Heart } from 'lucide-react';
import Image from 'next/image';

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
}

const VerticalCard = ({
  children,
  className = '',
  thumbnailUrl = '',
  thumbnailHeight = 252,
  thumbnailWidth = 303,
  title,
  location,
  onClickLike,
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
        {thumbnailUrl === '' ? (
          <Image
            className="rounded-[20px] object-cover"
            alt="card_thumbnail"
            fill
            src="/thumbnail.jpg"
          />
        ) : (
          <Image
            className="rounded-[20px] object-cover"
            alt="card_thumbnail"
            fill
            src={thumbnailUrl}
          />
        )}
      </div>
      <div className="mt-4">
        <div className="typo-head2 flex justify-between text-Cgray800">
          {title}
          <Heart
            className="cursor-pointer"
            width={24}
            height={24}
            color="#626675"
            onClick={handleLikeButton}
          />
        </div>
        <div className="mt-3 text-Cgray500">{location}</div>
        <Progress className="mt-4 overflow-hidden" value={33} total={100} />
      </div>
      {children}
    </div>
  );
};

export default VerticalCard;
