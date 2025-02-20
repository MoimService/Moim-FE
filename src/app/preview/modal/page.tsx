'use client';

import Some from '@/app/preview/modal/Some';
import { Button } from '@/components/ui/Button';
import Modal from '@/components/ui/modal/Modal';
import { useState } from 'react';

export default function ModalTestPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false); // 새로운 상태 추가

  const handleConfirm = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-BG p-4">
      <Button onClick={() => setIsModalOpen(true)}>이중 모달</Button>
      <Button onClick={() => setIsModalOpen2(true)}>그냥 모달</Button>
      <Button onClick={() => setIsModalOpen3(true)}>닫기만 있는 모달</Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        confirmText="삭제"
        cancelText="취소"
        modalClassName="w-96"
      >
        <Some />
      </Modal>

      <Modal
        isOpen={isModalOpen2}
        onClose={() => setIsModalOpen2(false)}
        onConfirm={handleConfirm}
        confirmText="삭제"
        cancelText="취소"
        modalClassName="w-96"
      >
        <p className="text-white">안녕하세용용</p>
      </Modal>

      <Modal
        isOpen={isModalOpen3}
        onClose={() => setIsModalOpen3(false)}
        closeOnly
        cancelText="닫기"
        modalClassName="w-96"
      >
        <p className="text-white">닫기 버튼만 있는 모달입니다!</p>
      </Modal>
    </div>
  );
}
