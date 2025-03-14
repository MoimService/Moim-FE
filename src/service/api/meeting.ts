import axiosInstance from '@/lib/axios/axiosInstance';
import type {
  CategoryTitle,
  IMeetingSearchCondition,
  Paginated,
  SearchMeeting,
  TopMeeting,
} from 'types/meeting';

const getTopMeetings = async (
  categoryTitle: CategoryTitle,
): Promise<TopMeeting[]> => {
  const res = await axiosInstance.get(`/api/v1/meetings/top`, {
    params: { categoryTitle },
  });

  return res.data.data;
};

const getMeetings = async (
  pageParams: number,
  category: CategoryTitle,
  searchQueryObj: IMeetingSearchCondition,
): Promise<Paginated<SearchMeeting>> => {
  const newSearchQueryObj = { ...searchQueryObj, lastMeetingId: pageParams };
  const res = await axiosInstance.post(
    `/api/v1/meetings/search?categoryTitle=${category}`,
    newSearchQueryObj,
  );

  return res.data.data;
};

const likeMeeting = async (meetingId: number) => {
  const res = await axiosInstance.post(`/api/v1/meetings/${meetingId}/likes`);

  return res.data.data;
};

const cancelLikeMeeting = async (meetingId: number) => {
  const res = await axiosInstance.delete(`/api/v1/meetings/${meetingId}/likes`);

  return res.data.data;
};

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
  meetingSkillArray: string[];
  categoryTitle: string;
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
  const res = await axiosInstance.get(`/api/v1/meetings/detail/${id}`);
  return res.data.data;
};

const getMeetingDetailManager = async (id: number): Promise<MeetingManager> => {
  const res = await axiosInstance.get(`/api/v1/meetings/detail/manager/${id}`);
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
  const res = await axiosInstance.post(`/api/v1/members/${meetingId}`, {
    message,
  });
  return res.data.data;
};

// Approve 상태에서 모임 탈퇴
const deleteMeetingQuit = async (meetingId: number) => {
  const res = await axiosInstance.delete(
    `/api/v1/mymeetings/quit/${meetingId}`,
  );

  return res.data.data;
};

export {
  getMeetingDetail,
  getMeetingDetailManager,
  postMeetingRegister,
  deleteMeetingQuit,
  getTopMeetings,
  getMeetings,
  likeMeeting,
  cancelLikeMeeting,
};
