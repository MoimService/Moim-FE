'use client';

import ModalRegisterComplete from '@/app/meeting/_features/modal-content/ModalRegisterComplete';
import ModalPortal from '@/components/ui/modal/ModalPortal';
import { useRouter } from 'next/navigation';

export default function UserListModal({
  params,
}: {
  params: { category: string; id: number };
}) {
  const router = useRouter();
  const category = params.category;
  const meetingId = Number(params.id);

  return (
    <ModalPortal
      isOpen={true}
      onClose={() =>
        router.push(`/meeting/${category}/${meetingId}`, { scroll: false })
      }
      confirmText="내 모임 보러가기"
      cancelText="확인"
      modalClassName="w-96"
    >
      <ModalRegisterComplete />
    </ModalPortal>
  );
}
