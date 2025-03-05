import ModalBeforeLogin from '@/app/meeting/_features/modal-content/ModalBeforeLogin';
import ModalCancel from '@/app/meeting/_features/modal-content/ModalCancel';
import ModalRegisterCheck from '@/app/meeting/_features/modal-content/ModalRegisterCheck';
import ModalRegisterComplete from '@/app/meeting/_features/modal-content/ModalRegisterComplete';
import ModalRegisterInput from '@/app/meeting/_features/modal-content/ModalRegisterInput';
import ModalRegisterWait from '@/app/meeting/_features/modal-content/ModalRegisterWait';
import { getAccessToken } from '@/lib/serverActions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MeetingDetail } from 'service/api/meeting';

import {
  useMeetingMutation,
  useMeetingQuitMutation,
} from './mutations/useMeetingMutation';

const useCard = (meeting: MeetingDetail) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalValue, setModalValue] = useState<{
    state: string; // 로그인 전, 신청 확인, 신청 입력, 신청 완료
    confirmText: string;
    cancelText: string;
    modalClassName?: string;
  }>({
    state: '',
    confirmText: '',
    cancelText: '',
  });
  const router = useRouter();

  const [ment, setMent] = useState('');

  const getToken = async () => {
    const token = await getAccessToken(); // 서버에서 데이터 패칭
    return token;
  };

  const handleModalOpen = async (state: string) => {
    // 경우의 수를 따져가며 여기서 모달 열기
    const token = await getToken();

    // 로그인 전인지 확인
    if (!token) {
      state = 'beforeLogin';
    }

    switch (state) {
      case 'cancel':
        setModalValue({
          state,
          confirmText: '신청 취소',
          cancelText: '돌아가기',
        });
        break;
      case 'beforeLogin':
        setModalValue({
          state,
          confirmText: '로그인',
          cancelText: '취소',
        });
        break;
      case 'registerCheck':
        setModalValue({
          state,
          confirmText: '신청',
          cancelText: '취소',
        });
        break;
      case 'registerInput':
        setModalValue({
          state,
          confirmText: '보내기',
          cancelText: '취소',
          modalClassName: 'w-[520px] py-[12px]',
        });
        break;
      case 'registerWait':
        setModalValue({
          state,
          confirmText: '내 모임 보러가기',
          cancelText: '확인',
        });
        break;
      case 'registerComplete':
        setModalValue({
          state,
          confirmText: '내 모임 보러가기',
          cancelText: '확인',
        });
        break;
    }
    setIsModalOpen(true);
  };

  const { mutate } = useMeetingMutation({
    onSuccessCallback: handleModalOpen,
    onErrorCallback: () => setIsModalOpen(false),
    meetingId: meeting.meetingId,
  });

  const { mutate: cancelMutate } = useMeetingQuitMutation({
    meetingId: meeting.meetingId,
  });

  // 모달의 confirm 버튼 동작을 현재 modalType에 따라 동적으로 처리
  const handleModalConfirm = () => {
    switch (modalValue.state) {
      case 'cancel':
        setIsModalOpen(false);
        cancelMutate();
        break;
      case 'beforeLogin':
        setIsModalOpen(false);
        router.push('/login');
        break;
      case 'registerCheck':
        handleModalOpen('registerInput');
        break;
      case 'registerInput':
        mutate({ message: ment });
        setMent('');
        break;
      case 'registerWait':
        router.push('/my-meeting/my?type=joined');
        setIsModalOpen(false);
        break;
      case 'registerComplete':
        router.push('/my-meeting/my?type=joined');
        setIsModalOpen(false);
        break;
      default:
        setIsModalOpen(false);
        break;
    }
  };

  // 모달 내부 콘텐츠를 조건부로 렌더링
  const renderModalContent = () => {
    switch (modalValue.state) {
      case 'cancel':
        return <ModalCancel />;
      case 'beforeLogin':
        return <ModalRegisterCheck />;
      case 'registerCheck':
        return <ModalBeforeLogin meeting={meeting} />;
      case 'registerInput':
        return <ModalRegisterInput ment={ment} setMent={setMent} />;
      case 'registerWait':
        return <ModalRegisterWait />;
      case 'registerComplete':
        return <ModalRegisterComplete />;
      default:
        return null;
    }
  };

  return {
    handleModalOpen,
    isModalOpen,
    setIsModalOpen,
    handleModalConfirm,
    modalValue,
    renderModalContent,
  };
};

export default useCard;
