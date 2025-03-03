import { authAPI } from '@/lib/axios/authApi';
import { useMutation } from '@tanstack/react-query';
import { meetingURL } from 'service/api/endpoints';
import { CreateMeetingPayload } from 'types/meetingForm';

const useMeetingFormMutation = () => {
  const createMeeting = useMutation({
    mutationFn: async (data: CreateMeetingPayload) => {
      const response = await authAPI.post(meetingURL.create, data);
      return response.data;
    },
  });

  return {
    createMeeting,
    isLoading: createMeeting.isPending,
    isError: createMeeting.isError,
    isSuccess: createMeeting.isSuccess,
    error: createMeeting.error,
  };
};

export default useMeetingFormMutation;
