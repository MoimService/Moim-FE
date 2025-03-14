'use client';

import ModalPortal from '@/components/ui/modal/ModalPortal';
import { useRouter } from 'next/navigation';

export default function UserListModal() {
  const router = useRouter();

  return (
    <ModalPortal
      isOpen={true}
      onConfirm={() => router.push('/login')}
      confirmText="로그인"
      cancelText="취소"
      modalClassName="w-96"
    >
      <div className="text-cg8 typo-head3 flex w-full justify-center">
        <p className="text-white">로그인이 필요한 서비스입니다.</p>
      </div>
    </ModalPortal>
  );
}
