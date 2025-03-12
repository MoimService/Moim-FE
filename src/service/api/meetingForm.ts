import axiosInstance from '@/lib/axios/axiosInstance';
import { CreateMeetingPayload } from 'types/meetingForm';

import { meetingURL } from './endpoints';

export const createMeeting = async (data: CreateMeetingPayload) => {
  const response = await axiosInstance.post(meetingURL.create, data);
  return response.data;
};

// 폼수정 API
export const editMeeting = async () => {};
