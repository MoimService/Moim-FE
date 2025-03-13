'use client';

import ModalPortal from '@/components/ui/modal/ModalPortal';
import {
  useExpelMutation,
  useMemberStatusMutation,
} from '@/hooks/mutations/useMyMeetingMutation';
import { useMyMeetingMemberProfileQuries } from '@/hooks/queries/useMyMeetingQueries';
import { useRouter } from 'next/navigation';

import ModalProfile from '../../../_features/ModalProfile';
import SkeletonProfile from '../../../_features/skeletons/SkeletonProfile';

export default function UserListModal({
  searchParams,
}: {
  searchParams: { userId: string; meetingId: string; memberStatus: string };
}) {
  const router = useRouter();
  const userId = Number(searchParams.userId);
  const meetingId = Number(searchParams.meetingId);
  const memberStatus = searchParams.memberStatus;

  // 유저 정보 파악
  const { data: selectedUser } = useMyMeetingMemberProfileQuries({
    meetingId,
    userId,
  });

  // 가입 승인 / 거절
  const { mutate: statusMutate } = useMemberStatusMutation(meetingId);

  // 내보내기
  const { mutate: expelMutate } = useExpelMutation(meetingId);

  const handleSecondModalConfirm = () => {
    if (!selectedUser) return;

    if (memberStatus === 'PENDING') {
      statusMutate({
        setMemberStatus: 'APPROVED',
        userId: selectedUser.userId,
      });
    }

    router.replace(`/my-meeting/my/user-list?meetingId=${meetingId}`);
  };

  const handleSecondModalCancel = () => {
    if (!selectedUser) return;

    if (memberStatus === 'PENDING') {
      statusMutate({
        setMemberStatus: 'REJECTED',
        userId: selectedUser.userId,
      });
    } else if (memberStatus === 'APPROVED') {
      expelMutate({
        setMemberStatus: 'EXPEL',
        userId: selectedUser.userId,
      });
    }

    router.replace(`/my-meeting/my/user-list?meetingId=${meetingId}`);
  };

  if (!selectedUser) return <SkeletonProfile />;

  return (
    <ModalPortal
      isOpen={true}
      onClose={handleSecondModalCancel}
      onConfirm={handleSecondModalConfirm}
      confirmText={memberStatus === 'PENDING' ? '가입승인' : '닫기'}
      cancelText={
        memberStatus === 'PENDING'
          ? '가입거절'
          : memberStatus === 'APPROVED'
            ? '내보내기'
            : '닫기'
      }
      closeOnly={!(memberStatus === 'PENDING' || memberStatus === 'APPROVED')}
      modalClassName="w-[450px] overflow-hidden bg-BG_2"
      buttonClassName="w-full"
    >
      <ModalProfile user={selectedUser} />
    </ModalPortal>
  );
}
