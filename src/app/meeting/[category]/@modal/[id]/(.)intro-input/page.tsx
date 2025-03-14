'use client';

import ModalRegisterInput from '@/app/meeting/_features/modal-content/ModalRegisterInput';
import ModalPortal from '@/components/ui/modal/ModalPortal';
import { useMeetingMutation } from '@/hooks/mutations/useMeetingMutation';
import { translateCategoryNameToEng } from '@/util/searchFilter';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function UserListModal({
  params,
}: {
  params: { category: string; id: number };
}) {
  const router = useRouter();
  const [value, setValue] = useState('');

  const meetingId = Number(params.id);
  const category = params.category;

  const { mutate } = useMeetingMutation({
    onSuccessCallback: (status: string) =>
      router.push(
        `/meeting/${translateCategoryNameToEng(category)}/${meetingId}/${status}`,
        { scroll: false },
      ),
    onErrorCallback: () =>
      router.push(
        `/meeting/${translateCategoryNameToEng(category)}/${meetingId}`,
        { scroll: false },
      ),
    meetingId: meetingId,
  });

  const handleConfirm = () => {
    mutate({ message: value });
    setValue('');
    router.push(
      `/meeting/${translateCategoryNameToEng(category)}/${meetingId}/intro-input`,
      { scroll: false },
    );
  };

  return (
    <ModalPortal
      isOpen={true}
      onConfirm={handleConfirm}
      confirmText="보내기"
      cancelText="취소"
      modalClassName="w-[520px] py-[12px]"
    >
      <ModalRegisterInput value={value} setValue={setValue} />
    </ModalPortal>
  );
}
