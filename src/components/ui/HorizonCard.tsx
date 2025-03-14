import useLikeHandler from '@/hooks/common/useLikeHandler';
import { getIconComponent } from '@/util/getIconDetail';
import { translateCategoryNameToEng } from '@/util/searchFilter';
import { Heart, Map } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { IMeetingSearchCondition } from 'types/meeting';

import { Button } from './Button';
import { Progress } from './Progress';
import Modal from './modal/Modal';
import TechButton from './tech-stack/tech-stack-components/TechButton';

interface HorizonCardProps {
  meetingId: number;
  category: string;
  title: string;
  location: string;
  value: number;
  total: number;
  children?: React.ReactElement;
  className?: string;
  thumbnailUrl?: string;
  thumbnailWidth?: number;
  thumbnailHeight?: number;
  onClick?: (id: number) => void;
  searchQuery?: IMeetingSearchCondition;
  showLikeButton?: boolean;
  isLike?: boolean;
  likesCount?: number;
  skills?: string[];
}

const HorizonCard = ({
  meetingId,
  category,
  children,
  className = '',
  thumbnailUrl = '/thumbnail.jpg',
  thumbnailHeight = 208,
  thumbnailWidth = 252,
  title,
  location,
  onClick,
  isLike = false,
  value,
  total = 100,
  searchQuery,
  showLikeButton = true,
  likesCount,
  skills,
}: HorizonCardProps) => {
  const { toggleLike } = useLikeHandler({
    meetingId,
    category,
    searchQuery,
    onAuthRequired: () =>
      router.push(
        `/meeting/${translateCategoryNameToEng(category)}/need-login`,
      ),
  });

  const handleLikeButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toggleLike(isLike);
  };

  // TODO: 리팩토링 예정
  const { id } = useParams();

  const handleClickCard = () => {
    if (isLoginModalOpen) return;
    if (onClick && !id) onClick(meetingId);
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
      className={`relative flex h-auto w-full flex-shrink-0 ${!id && 'cursor-pointer'} bg-BG p-4 ${className}`}
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
      {showLikeButton && (
        <Button
          className="absolute right-4 top-4 h-auto w-auto"
          variant="text"
          size="sm"
          onClick={(e) => handleLikeButton(e)}
          icon={
            <Heart
              style={{ width: '24px', height: '24px' }}
              className={`${isLike ? 'fill-main' : 'stroke-Cgray500'} h-4 w-4 md:h-6 md:w-6`}
            />
          }
        >
          <span className="typo-caption2 absolute top-7 text-Cgray500">
            {likesCount}
          </span>
        </Button>
      )}
      <div
        className="relative flex-shrink-0"
        style={{ height: `${thumbnailHeight}px`, width: `${thumbnailWidth}px` }}
      >
        {!thumbnailLoaded && (
          <div className="h-full w-full animate-pulse rounded-[20px] bg-Cgray200"></div>
        )}
        <Image
          className="rounded-[20px] object-cover"
          src={thumbnail ? thumbnail : '/thumbnail.jpg'}
          alt="card_thumbnail"
          fill
          onError={() => setThumbnail('/thumbnail.jpg')}
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center px-[10px] md:px-[30px] lg:px-[40px]">
        <div className="type-button2 flex justify-between text-Cgray800 md:typo-head2 lg:typo-head2">
          <span className="mr-4 max-w-[950px] overflow-hidden truncate text-ellipsis whitespace-nowrap">
            {title}
          </span>
        </div>
        <div className="md:typo-button typo-body2 mt-3 flex items-center gap-1 truncate text-Cgray500 lg:typo-button1">
          <Map size={20} strokeWidth={1} />
          <span className="max-w-[950px] overflow-hidden truncate text-ellipsis whitespace-nowrap">
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

export default HorizonCard;
