import axiosInstance from '@/lib/axios/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { meetingURL } from 'service/api/endpoints';
import { CreateMeetingPayload, CreateMeetingResponse } from 'types/meetingForm';
import { UpdateMeetingPayload } from 'types/meetingForm';

import { meetingKeys } from '../queries/useMeetingQueries';

const useMeetingFormMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: {
  onSuccessCallback: (
    response: CreateMeetingResponse,
    formData: CreateMeetingPayload,
  ) => void;
  onErrorCallback: (error: AxiosError) => void;
  onUpdateSuccessCallback?: (
    response: CreateMeetingResponse,
    formData: CreateMeetingPayload,
  ) => void;
  onUpdateErrorCallback?: (error: AxiosError) => void;
}) => {
  const queryClient = useQueryClient();
  const createMeeting = useMutation({
    mutationFn: async (formData: CreateMeetingPayload) => {
      const response = await axiosInstance.post<CreateMeetingResponse>(
        meetingURL.create,
        formData,
      );
      return { response: response.data, formData };
    },
    onSuccess: (data) => {
      onSuccessCallback(data.response, data.formData);
      queryClient.invalidateQueries({
        queryKey: meetingKeys.all,
      });
      queryClient.invalidateQueries({ queryKey: ['meetings'] });
    },
    onError: (error: AxiosError) => {
      onErrorCallback(error);
    },
  });

  const updateMeeting = useMutation({
    mutationFn: async ({
      meetingId,
      formData,
    }: {
      meetingId: number;
      formData: UpdateMeetingPayload;
    }) => {
      const response = await axiosInstance.put<CreateMeetingResponse>(
        meetingURL.update(meetingId),
        formData,
      );
      return {
        response: response.data,
        formData: formData as unknown as CreateMeetingPayload,
      };
    },
    onSuccess: (data) => {
      if (onSuccessCallback) {
        onSuccessCallback(data.response, data.formData);
        queryClient.invalidateQueries({
          queryKey: meetingKeys.all,
        });
        queryClient.invalidateQueries({ queryKey: ['meetings'] });
      }
    },
    onError: (error: AxiosError) => {
      onErrorCallback(error);
    },
  });

  return {
    createMeeting,
    updateMeeting,
    isLoading: createMeeting.isPending || updateMeeting.isPending,
    isError: createMeeting.isError || updateMeeting.isError,
    isSuccess: createMeeting.isSuccess || updateMeeting.isSuccess,
    error: createMeeting.error || updateMeeting.error,
  };
};

export default useMeetingFormMutation;
