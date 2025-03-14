'use client';

import ModalCancel from '@/app/meeting/_features/modal-content/ModalCancel';
import ModalQuit from '@/app/meeting/_features/modal-content/ModalQUIT';
import ModalPortal from '@/components/ui/modal/ModalPortal';
import {
  useMeetingCancelMutation,
  useMeetingQuitMutation,
} from '@/hooks/mutations/useMeetingMutation';
import { useRouter } from 'next/navigation';

export default function UserListModal({
  params,
}: {
  params: { category: string; id: number };
}) {
  const router = useRouter();
  const category = params.category;
  const meetingId = Number(params.id);

  const { mutate: quitMutate } = useMeetingQuitMutation({
    meetingId: meetingId,
  });

  const handleConfirm = () => {
    quitMutate();
    router.back();
  };

  return (
    <ModalPortal
      isOpen={true}
      onClose={() =>
        router.push(`/meeting/${category}/${meetingId}`, { scroll: false })
      }
      onConfirm={handleConfirm}
      confirmText="탈퇴하기"
      cancelText="돌아가기"
      modalClassName="w-[450px]"
    >
      <ModalQuit />
    </ModalPortal>
  );
}
