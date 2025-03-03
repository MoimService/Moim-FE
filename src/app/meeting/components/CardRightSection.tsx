'use client';

import { Button } from '@/components/ui/Button';
import Modal from '@/components/ui/modal/Modal';
import useCard from '@/hooks/useCard';
import { getDDay } from '@/util/date';
import { MeetingDetail } from 'service/api/meeting';

const CardRightSection = ({ meeting }: { meeting: MeetingDetail }) => {
  const {
    handleModalOpen,
    isModalOpen,
    setIsModalOpen,
    handleModalConfirm,
    modalValue,
    renderModalContent,
  } = useCard(meeting);

  return (
    <div className="flex w-full flex-col justify-end gap-[24px] py-[16px] md:p-[16px] lg:h-[208px] lg:w-[318px]">
      <div className="md:ml-[8px] lg:ml-0">
        <p className="typo-head3 text-Cgray500">모임 시작</p>
        <div className="flex items-end">
          <p className="typo-head1 text-Cgray800">
            {getDDay(meeting.startdate)}
          </p>
          <p className="typo-button1 mb-2 ml-1 text-Cgray800">일</p>
        </div>
      </div>
      {!meeting.isMember ? (
        meeting.maxMember === meeting.memberCount ? (
          <Button className="w-full" disabled>
            인원이 꽉찼어요
          </Button>
        ) : (
          <Button
            className="w-full"
            onClick={() => handleModalOpen('registerCheck')}
          >
            신청하기
          </Button>
        )
      ) : (
        <Button
          className="w-full"
          variant={'outline'}
          onClick={() => handleModalOpen('cancel')}
        >
          신청 취소하기
        </Button>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleModalConfirm}
        confirmText={modalValue.confirmText}
        cancelText={modalValue.cancelText}
        modalClassName={`w-96 ${modalValue.modalClassName}`}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};
export default CardRightSection;
