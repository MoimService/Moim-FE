// components/CardImage.js
import Image from 'next/image';
import { useState } from 'react';
import React from 'react';

interface CardImageProps {
  src: string;
  width: number;
  height: number;
}

const CardImage = React.memo(({ src, width, height }: CardImageProps) => {
  const [thumbnail, setThumbnail] = useState(src);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  return (
    <div
      className="relative flex-shrink-0"
      style={{ height: `${height}px`, width: `${width}px` }}
    >
      {!thumbnailLoaded && (
        <div className="animate-pulse h-full w-full rounded-[20px] bg-Cgray200"></div>
      )}
      <Image
        className="transform-gpu rounded-[20px] object-cover"
        src={thumbnail}
        alt="card_image"
        fill
        onError={() => {
          setThumbnail('/thumbnail.jpg');
        }}
        onLoad={() => setThumbnailLoaded(true)}
      />
    </div>
  );
});

CardImage.displayName = 'CardImage';

export default CardImage;
