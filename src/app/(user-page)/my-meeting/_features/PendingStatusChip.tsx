'use client';

import { useCancelPendingMutation } from '@/hooks/mutations/useMyMeetingMutation';
import { LogOut } from 'lucide-react';

interface PendingStatusChipProps {
  meetingId: number;
  text?: string;
}

export const PendingStatusChip = ({
  meetingId,
  text,
}: PendingStatusChipProps) => {
  const { mutate: cancelPending, isPending: isLoading } =
    useCancelPendingMutation();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    cancelPending(meetingId);
  };

  return (
    <div className="absolute left-2 top-2 z-10 flex h-8 overflow-hidden rounded-md shadow-md">
      <div className="flex items-center bg-main bg-opacity-90 px-3 py-1 text-sm font-medium text-white">
        <span>승인 대기중</span>
      </div>

      <button
        type="button"
        className={`flex cursor-pointer items-center gap-2 bg-Cgray300 px-2 text-white transition-colors hover:bg-opacity-90 ${
          isLoading ? 'opacity-70' : ''
        }`}
        onClick={handleClick}
        aria-label="승인 대기 취소"
        disabled={isLoading}
      >
        <LogOut size={16} className={isLoading ? 'animate-pulse' : ''} />
        {isLoading ? '취소 중...' : (text ?? '취소')}
      </button>
    </div>
  );
};

export default PendingStatusChip;
