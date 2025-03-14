'use client';

import ModalBeforeLogin from '@/app/meeting/_features/modal-content/ModalBeforeLogin';
import ModalPortal from '@/components/ui/modal/ModalPortal';
import { meetingKeys } from '@/hooks/queries/useMeetingQueries';
import { translateCategoryNameToEng } from '@/util/searchFilter';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { MeetingDetail } from 'service/api/meeting';

export default function UserListModal({
  params,
}: {
  params: { category: string; id: number };
}) {
  const router = useRouter();
  const meetingId = Number(params.id);
  const queryClient = useQueryClient();

  const meeting = queryClient.getQueryData<MeetingDetail>(
    meetingKeys.detailInfo(meetingId),
  );

  if (!meeting) return null;

  return (
    <ModalPortal
      isOpen={true}
      onConfirm={() =>
        router.push(
          `/meeting/${translateCategoryNameToEng(meeting.categoryTitle)}/${meeting.meetingId}/intro-input`,
          { scroll: false },
        )
      }
      confirmText="신청"
      cancelText="취소"
      modalClassName="w-96"
    >
      <ModalBeforeLogin meeting={meeting!} />
    </ModalPortal>
  );
}
