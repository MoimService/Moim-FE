import axiosInstance from '@/lib/axios/axiosInstance';
import {
  CreateMeetingPayload,
  CreateMeetingResponse,
  UpdateMeetingPayload,
} from 'types/meetingForm';

import { meetingURL } from './endpoints';

export const createMeeting = async (
  data: CreateMeetingPayload,
): Promise<CreateMeetingResponse> => {
  const response = await axiosInstance.post<CreateMeetingResponse>(
    meetingURL.create,
    data,
  );
  return response.data;
};

export const editMeeting = async (
  meetingId: number,
  data: UpdateMeetingPayload,
): Promise<CreateMeetingResponse> => {
  const response = await axiosInstance.put<CreateMeetingResponse>(
    meetingURL.update(meetingId),
    data,
  );
  return response.data;
};
