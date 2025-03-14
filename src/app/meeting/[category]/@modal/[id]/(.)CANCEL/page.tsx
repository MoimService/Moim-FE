'use client';

import ModalCancel from '@/app/meeting/_features/modal-content/ModalCancel';
import ModalPortal from '@/components/ui/modal/ModalPortal';
import { useMeetingQuitMutation } from '@/hooks/mutations/useMeetingMutation';
import { useRouter } from 'next/navigation';

export default function UserListModal({
  params,
}: {
  params: { category: string; id: number };
}) {
  const router = useRouter();
  const category = params.category;
  const meetingId = Number(params.id);

  const { mutate: cancelMutate } = useMeetingQuitMutation({
    meetingId: meetingId,
  });

  const handleConfirm = () => {
    cancelMutate();
    router.back();
  };

  return (
    <ModalPortal
      isOpen={true}
      onClose={() =>
        router.push(`/meeting/${category}/${meetingId}`, { scroll: false })
      }
      onConfirm={handleConfirm}
      confirmText="신청 취소"
      cancelText="돌아가기"
      modalClassName="w-96"
    >
      <ModalCancel />
    </ModalPortal>
  );
}
