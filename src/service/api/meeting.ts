import { authAPI } from '@/lib/axios/authApi';
import { basicAPI } from '@/lib/axios/basicApi';

export interface MeetingDetail {
  meetingId: number;
  title: string;
  thumbnail: string;
  location: string;
  memberCount: number;
  maxMember: number;
  content: string;
  startdate: string;
  requireApproval: boolean;
  isLike: boolean;
  isMember: boolean;
}

export interface MeetingManager {
  name: string;
  profilePic: string;
  email: string;
  intro: string;
  phone: string;
  skillArray: string[];
}

const getMeetingDetail = async (id: number): Promise<MeetingDetail> => {
  const res = await authAPI.get(`/api/v1/meetings/detail/${id}`);
  return res.data.data;
};

const getMeetingDetailManager = async (id: number): Promise<MeetingManager> => {
  const res = await basicAPI.get(`/api/v1/meetings/detail/manager/${id}`);
  return res.data.data;
};

// 모임 참가
const postMeetingRegister = async ({
  meetingId,
  message,
}: {
  meetingId: number;
  message: string;
}) => {
  const res = await authAPI.post(`/api/v1/members/${meetingId}`, { message });
  return res.data.data;
};

// Approve 상태에서 모임 탈퇴
const deleteMeetingQuit = async (meetingId: number) => {
  const res = await authAPI.delete(`/api/v1/mymeetings/quit/${meetingId}`);

  return res.data.data;
};

export {
  getMeetingDetail,
  getMeetingDetailManager,
  postMeetingRegister,
  deleteMeetingQuit,
};
