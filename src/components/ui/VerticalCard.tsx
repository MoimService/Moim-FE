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
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useToast } from '../common/ToastContext';
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
  likesCount,
  value,
  total = 100,
  skills,
}: VerticalCardProps) => {
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

  // TODO: 리팩토링 예정
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

  const handleClickCard = () => {
    if (isLoginModalOpen) return;
    if (onClick) onClick(meetingId);
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
      className={`h-auto w-[335px] cursor-pointer bg-BG p-4 ${className}`}
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
        <Image
          className="rounded-[20px] object-cover"
          src={thumbnail ? thumbnail : '/thumbnail.jpg'}
          alt="card_thumbnail"
          fill
          onError={() => setThumbnail('/thumbnail.jpg')}
        />
      </div>
      <div className="mt-4">
        <div className="typo-head2 flex justify-between truncate text-Cgray800 ">
          <span className="max-w-[270px] overflow-hidden truncate text-ellipsis whitespace-nowrap">
            {title}
          </span>
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
        </div>
        <div className="mt-3 truncate text-Cgray500">
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
