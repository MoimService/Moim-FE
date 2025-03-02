import {
  useCancelLikeMeeting,
  useLikeMeeting,
} from '@/hooks/mutations/useMeetingMutation';
import {
  MEETING_QUERY_KEYS,
  meetingKeys,
} from '@/hooks/queries/useMeetingQueries';
import { getAccessToken } from '@/lib/serverActions';
import { getIconComponent } from '@/util/getIconDetail';
import { useQueryClient } from '@tanstack/react-query';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { useToast } from '../common/ToastContext';
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
  likesCount,
  skills,
}: HorizonCardProps) => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: likeMutation } = useLikeMeeting(meetingId, {
    onSuccess: () => {
      invalidateMeetingQuery();
    },
    onError: () => {
      showToast('잠시 후 다시 시도해주세요', 'error', { duration: 3000 });
    },
  });

  const { mutate: cancellikeMutation } = useCancelLikeMeeting(meetingId, {
    onSuccess: () => {
      invalidateMeetingQuery();
    },
    onError: () => {
      showToast('잠시 후 다시 시도해주세요', 'error', { duration: 3000 });
    },
  });

  const invalidateMeetingQuery = () => {
    queryClient.invalidateQueries({
      queryKey: MEETING_QUERY_KEYS.meetings(category),
    });
    queryClient.invalidateQueries({
      queryKey: MEETING_QUERY_KEYS.topMeetings(category),
    });
    queryClient.invalidateQueries({
      queryKey: meetingKeys.detailInfo(meetingId),
    });
  };

  // TODO: 리팩토링 예정
  const { id } = useParams();

  const handleClickCard = () => {
    if (isLoginModalOpen) return;
    if (onClick && !id) onClick(meetingId);
  };

  const handleLikeButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const token = await getAccessToken();

    // 토큰 없으면 로그인 안내 팝업 노출
    if (!token) {
      setIsLoginModalOpen(true);
      return;
    }

    if (!isLike) {
      likeMutation();
    }

    if (isLike) {
      cancellikeMutation();
    }
  };

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  const [thumbnail, setThumbnail] = useState(thumbnailUrl);

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

      <div
        className="relative flex-shrink-0"
        style={{ height: `${thumbnailHeight}px`, width: `${thumbnailWidth}px` }}
      >
        <Image
          className="rounded-[20px] object-cover"
          src={thumbnail ? thumbnail : '/thumbnail.jpg'}
          alt="card_thumbnail"
          fill
          onError={() => setThumbnail('/thumbnail.jpg')}
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col px-[10px] md:px-[30px] lg:px-[40px]">
        <div className="type-button2 flex justify-between text-Cgray800 md:typo-head2 lg:typo-head2">
          <span className="mr-4 max-w-[950px] overflow-hidden truncate text-ellipsis whitespace-nowrap">
            {title}
          </span>
        </div>
        <div className="md:typo-button typo-body2 mt-3 flex truncate text-Cgray500 lg:typo-button1">
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
