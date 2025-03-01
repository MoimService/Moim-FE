import {
  useCancelLikeMeeting,
  useLikeMeeting,
} from '@/hooks/mutations/useMeetingMutation';
import { MEETING_QUERY_KEYS } from '@/hooks/queries/useMeetingQueries';
import { getAccessToken } from '@/lib/serverActions';
import { getIconComponent } from '@/util/getIconDetail';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MeetingSkill } from 'types/meeting';

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
  onClickLike?: () => void;
  isLike?: boolean;
  skills?: MeetingSkill[];
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
  onClickLike,
  isLike = false,
  value,
  total = 100,
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
  };

  const handleLikeButton = async () => {
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

  return (
    <div
      className={`relative flex h-auto w-full flex-shrink-0 bg-BG p-4 ${className}`}
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
        onClick={handleLikeButton}
        icon={
          <Heart
            style={{ width: '24px', height: '24px' }}
            className={`${isLike ? 'fill-main' : 'stroke-Cgray500'} h-4 w-4 md:h-6 md:w-6`}
          />
        }
      ></Button>

      <div
        className="relative flex-shrink-0"
        style={{ height: `${thumbnailHeight}px`, width: `${thumbnailWidth}px` }}
      >
        <Image
          className="rounded-[20px] object-cover"
          alt="card_thumbnail"
          fill
          src={thumbnailUrl === '' ? '/thumbnail.jpg' : thumbnailUrl}
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
                key={skill.skillTitle}
                name={skill.skillTitle}
                icon={getIconComponent(skill.skillTitle)}
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
