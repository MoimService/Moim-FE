import { authAPI } from '@/lib/axios/authApi';
import { Paginated } from 'types/meeting';
import type { IMemberProfile, IMyMeetingManage } from 'types/myMeeting';

// 내가 만든 모임 불러오기
const getMyMeetingManage = async (
  lastMeetingId: number,
): Promise<Paginated<IMyMeetingManage>> => {
  const res = await authAPI.get(
    `/api/v1/mymeetings/manage?lastMeetingId=${lastMeetingId}&size=${6}`,
  );

  return res.data.data;
};

// 맴버 프로필 불러오기
const getMyMeetingMemberProfile = async ({
  userId,
  meetingId,
}: {
  userId?: number;
  meetingId: number;
}): Promise<IMemberProfile> => {
  const res = await authAPI.get(
    `/api/v1/mymeetings/member-profile?userId=${userId}&meetingId=${meetingId}`,
  );

  return res.data.data;
};

// 가입 승인 / 거절
const putMemberStatus = async ({
  userId,
  meetingId,
  setMemberStatus,
}: {
  userId: number;
  meetingId: number;
  setMemberStatus: 'APPROVED' | 'REJECTED';
}) => {
  const res = await authAPI.put(`/api/v1/mymeetings/member-status`, {
    userId,
    meetingId,
    setMemberStatus,
  });

  return res.data.data;
};

// 강퇴
const putExpel = async ({
  userId,
  meetingId,
  setMemberStatus,
}: {
  userId: number;
  meetingId: number;
  setMemberStatus: 'EXPEL';
}) => {
  const res = await authAPI.put(`/api/v1/mymeetings/expel`, {
    userId,
    meetingId,
    setMemberStatus,
  });

  return res.data.data;
};

// 공개 / 비공개 설정
const putIsPublic = async (meetingId: number) => {
  const res = await authAPI.put(`/api/v1/mymeetings/isPublic/${meetingId}`);
  return res.data.data;
};

export {
  getMyMeetingManage,
  getMyMeetingMemberProfile,
  putMemberStatus,
  putExpel,
  putIsPublic,
};
