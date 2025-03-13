import axiosInstance from '@/lib/axios/axiosInstance';
import { Paginated } from 'types/meeting';
import type { IMemberProfile, IMyMeetingManage } from 'types/myMeeting';
import { IMyMeetingLikes } from 'types/myMeeting';

import { myMeetingURL } from './endpoints';

// 내가 만든 모임 불러오기
const getMyMeetingManage = async (
  lastMeetingId: number,
): Promise<Paginated<IMyMeetingManage>> => {
  const res = await axiosInstance.get(
    `${myMeetingURL.manage}?lastMeetingId=${lastMeetingId}&size=${6}`,
  );

  return res.data.data;
};

// 내가 참여하고있는 모임 불러오기
const getMyMeetingParticipated = async (
  lastMeetingId: number,
): Promise<Paginated<IMyMeetingManage>> => {
  const res = await axiosInstance.get(
    `${myMeetingURL.all}?lastMeetingId=${lastMeetingId}&size=${6}`,
  );

  return res.data.data;
};

// 내가 찜한 모임 불러오기
const getMyMeetingLikes = async (
  lastMeetingId: number,
): Promise<Paginated<IMyMeetingLikes>> => {
  const res = await authAPI.get(
    `${myMeetingURL.likes}?lastMeetingId=${lastMeetingId}&size=${6}`,
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
  const res = await axiosInstance.get(
    `${myMeetingURL.memberProfile}?userId=${userId}&meetingId=${meetingId}`,
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
  const res = await axiosInstance.put(`${myMeetingURL.memberStatus}`, {
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
  const res = await axiosInstance.put(`${myMeetingURL.expel}`, {
    userId,
    meetingId,
    setMemberStatus,
  });

  return res.data.data;
};

// 공개 / 비공개 설정
const putIsPublic = async (meetingId: number) => {
  const res = await axiosInstance.put(`${myMeetingURL.isPublic(meetingId)}`);
  return res.data.data;
};

export {
  getMyMeetingManage,
  getMyMeetingMemberProfile,
  getMyMeetingParticipated,
  getMyMeetingLikes,
  putMemberStatus,
  putExpel,
  putIsPublic,
};
