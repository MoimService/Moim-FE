import { authAPI } from '@/lib/axios/authApi';
import { useMutation } from '@tanstack/react-query';
import { meetingURL } from 'service/api/endpoints';
import { CreateMeetingPayload } from 'types/meetingForm';
import { CreateMeetingResponse } from 'types/meetingForm';

const useMeetingFormMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: {
  onSuccessCallback: (
    response: CreateMeetingResponse,
    formData: CreateMeetingPayload,
  ) => void;
  onErrorCallback: (error: unknown) => void;
}) => {
  const createMeeting = useMutation({
    mutationFn: async (formData: CreateMeetingPayload) => {
      const response = await authAPI.post<CreateMeetingResponse>(
        meetingURL.create,
        formData,
      );
      return { response: response.data, formData };
    },
    onSuccess: (data) => {
      onSuccessCallback(data.response, data.formData);
    },
    onError: (error) => {
      onErrorCallback(error);
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
