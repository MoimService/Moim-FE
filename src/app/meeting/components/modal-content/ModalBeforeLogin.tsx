'use client';

import Image from 'next/image';
import { MeetingDetail } from 'service/api/meeting';

const ModalBeforeLogin = ({ meeting }: { meeting: MeetingDetail }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="typo-head3 text-main">[{meeting.title}]</h3>
      <h3 className="typo-head3 mt-[4px] text-Cgray800">
        모임에 신청하시겠어요?
      </h3>
      <Image
        width={160}
        height={160}
        className="mt-[16px] h-[160px] w-[160px] rounded-[14px]"
        src={meeting.thumbnail ? meeting.thumbnail : '/thumbnail.jpg'}
        alt="모임 썸네일"
      />
    </div>
  );
};
export default ModalBeforeLogin;
