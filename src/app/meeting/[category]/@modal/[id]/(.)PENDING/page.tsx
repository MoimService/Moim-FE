'use client';

import ModalRegisterWait from '@/app/meeting/_features/modal-content/ModalRegisterWait';
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
      onConfirm={() => router.push('/my-meeting/my?type=joined')}
      confirmText="내 모임 보러가기"
      cancelText="확인"
      modalClassName="w-96"
    >
      <ModalRegisterWait />
    </ModalPortal>
  );
}
