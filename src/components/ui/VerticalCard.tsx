import { Heart } from 'lucide-react';
import Image from 'next/image';

interface VerticalCardProps {
  children?: React.ReactElement;
  className?: string;
  thumbnailUrl?: string;
  thumbnailWidth?: number;
  thumbnailHeight?: number;
  title: string;
  location: string;
}

const VerticalCard = ({
  children,
  className = '',
  thumbnailUrl = '',
  thumbnailHeight = 252,
  thumbnailWidth = 303,
  title,
  location,
}: VerticalCardProps) => {
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
          <Heart width={24} height={24} />
        </div>
        <div className="mt-3 text-Cgray500">{location}</div>
      </div>
      {children}
    </div>
  );
};

export default VerticalCard;
