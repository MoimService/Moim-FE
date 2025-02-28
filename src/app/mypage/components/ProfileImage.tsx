'use client';

import EditLogo from '@/assets/icon/editLogo.svg';
import { Button } from '@/components/ui/Button';
import Modal from '@/components/ui/modal/Modal';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

const ProfileImage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleConfirm = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex flex-col pt-[83px]">
      <div className="typo-head3 text-Cgray700">프로필 이미지</div>
      <div className="flex justify-center gap-[24px] py-[24px]">
        <div className="relative flex h-[252px] w-[252px] items-center justify-center rounded-[20px] border border-Cgray300 bg-Cgray200">
          <EditLogo className="text-Cgray700" width={86} height={86} />
          <div className="absolute bottom-[15px] right-[15px]">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="h-[34px] w-[34px] rounded-full"
              icon={<Pencil />}
            ></Button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        confirmText="변경"
        cancelText="취소"
        modalClassName="w-[450px]"
        buttonClassName="pt-0 px-[24px] pb-[24px]"
      >
        <div className="flex flex-col items-center justify-center gap-[16px]">
          <div className="typo-head3 text-Cgray700">프로필 이미지</div>
          <div className="flex justify-center">
            <div className="relative flex h-[160px] w-[160px] items-center justify-center rounded-[20px] border border-Cgray300 bg-Cgray200">
              <EditLogo className="text-Cgray700" width={86} height={86} />
              <div className="absolute bottom-[15px] right-[15px]"></div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileImage;
