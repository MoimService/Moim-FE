import useLikeHandler from '@/hooks/common/useLikeHandler';
import { getIconComponent } from '@/util/getIconDetail';
import { Heart, Map } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IMeetingSearchCondition } from 'types/meeting';

import { Button } from './Button';
import { Progress } from './Progress';
import Modal from './modal/Modal';
import TechButton from './tech-stack/tech-stack-components/TechButton';

interface VerticalCardProps {
  children?: React.ReactElement;
  className?: string;
  category: string;
  thumbnailUrl?: string;
  thumbnailWidth?: number;
  thumbnailHeight?: number;
  meetingId: number;
  title: string;
  location: string;
  onClick?: (id: number) => void;
  isLike?: boolean;
  showLikeButton?: boolean;
  searchQuery?: IMeetingSearchCondition;
  value: number;
  total: number;
  likesCount?: number;
  skills?: string[];
}

const VerticalCard = ({
  children,
  className = '',
  category,
  thumbnailUrl = '/thumbnail.jpg',
  thumbnailHeight = 252,
  thumbnailWidth = 303,
  meetingId,
  title,
  location,
  onClick,
  isLike = false,
  showLikeButton = true,
  searchQuery,
  value,
  total = 100,
  skills,
}: VerticalCardProps) => {
  const handleClickCard = () => {
    if (isLoginModalOpen) return;
    if (onClick) onClick(meetingId);
  };

  const { toggleLike } = useLikeHandler({
    meetingId,
    category,
    searchQuery,
    onAuthRequired: () => setIsLoginModalOpen(true),
  });

  const handleLikeButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toggleLike(isLike);
  };

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  const [thumbnail, setThumbnail] = useState(thumbnailUrl);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);

  return (
    <div
      className={`flex h-[490px] w-[335px] cursor-pointer flex-col justify-between bg-BG p-4 ${className}`}
      role="presentation"
      onClick={handleClickCard}
    >
      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onConfirm={handleLogin}
        confirmText="로그인"
        cancelText="취소"
        modalClassName="w-96"
      >
        <p className="text-center text-white">로그인이 필요한 서비스 입니다.</p>
      </Modal>
      <div
        className={'relative'}
        style={{ height: `${thumbnailHeight}px`, width: `${thumbnailWidth}px` }}
      >
        {!thumbnailLoaded && (
          <div className="h-full w-full animate-pulse rounded-[20px] bg-Cgray200"></div>
        )}
        <Image
          className="flex-shrink-0 rounded-[20px] object-cover"
          src={thumbnail ? thumbnail : '/thumbnail.jpg'}
          alt="card_thumbnail"
          fill
          onError={() => setThumbnail('/thumbnail.jpg')}
          onLoad={() => setThumbnailLoaded(true)}
        />
      </div>
      <div className="mt-4">
        <div className="typo-head2 relative flex h-[40px] justify-between truncate text-Cgray800 ">
          <span className="max-w-[270px] overflow-hidden truncate text-ellipsis whitespace-nowrap">
            {title}
          </span>
          {showLikeButton && (
            <Button
              className="relative h-auto w-auto"
              variant="text"
              size="sm"
              onClick={(e) => handleLikeButton(e)}
              icon={
                <Heart
                  style={{ width: '24px', height: '24px' }}
                  className={isLike ? 'fill-main' : 'stroke-Cgray500'}
                />
              }
            ></Button>
          )}
        </div>
        <div className="relative flex items-center gap-1 truncate text-Cgray500">
          <Map size={20} strokeWidth={1} />
          <span className="max-w-[270px] overflow-hidden truncate text-ellipsis whitespace-nowrap">
            {location}
          </span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {skills &&
            skills?.length > 0 &&
            skills.map((skill) => (
              <TechButton
                className="h-6"
                key={skill}
                name={skill}
                icon={getIconComponent(skill)}
                color={'#333'}
                isClicked={true}
                isMaxReached={false}
                onClick={() => {}}
              />
            ))}
        </div>
        <Progress
          className="mt-4 overflow-hidden"
          value={value}
          total={total}
          showCounter={true}
        />
      </div>
      {children}
    </div>
  );
};

export default VerticalCard;
