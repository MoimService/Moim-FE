import { authAPI } from '@/lib/axios/authApi';
import { CreateMeetingPayload } from 'types/meetingForm';

import { meetingURL } from './endpoints';

export const createMeeting = async (data: CreateMeetingPayload) => {
  const response = await authAPI.post(meetingURL.create, data);
  return response.data;
};

// 폼수정 API
export const editMeeting = async () => {};
