import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { createMeeting, editMeeting } from 'service/api/meetingForm';
import {
  CreateMeetingPayload,
  CreateMeetingResponse,
  UpdateMeetingPayload,
} from 'types/meetingForm';

import { meetingKeys } from '../queries/useMeetingQueries';

interface MeetingMutationProps {
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
}

const useMeetingFormMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: MeetingMutationProps) => {
  const queryClient = useQueryClient();

  const invalidateQueries = () => {
    queryClient.invalidateQueries({
      queryKey: meetingKeys.all,
    });
    queryClient.invalidateQueries({ queryKey: ['meetings'] });
  };

  const createMeetingMutation = useMutation({
    mutationFn: async (formData: CreateMeetingPayload) => {
      const response = await createMeeting(formData);
      return { response, formData };
    },
    onSuccess: (data) => {
      onSuccessCallback(data.response, data.formData);
      invalidateQueries();
    },
    onError: (error: AxiosError) => {
      onErrorCallback(error);
    },
  });

  const updateMeetingMutation = useMutation({
    mutationFn: async ({
      meetingId,
      formData,
    }: {
      meetingId: number;
      formData: UpdateMeetingPayload;
    }) => {
      const response = await editMeeting(meetingId, formData);
      return {
        response,
        formData: formData as unknown as CreateMeetingPayload,
      };
    },
    onSuccess: (data) => {
      onSuccessCallback(data.response, data.formData);
      invalidateQueries();
    },
    onError: (error: AxiosError) => {
      onErrorCallback(error);
    },
  });

  return {
    createMeeting: createMeetingMutation,
    updateMeeting: updateMeetingMutation,
    isLoading:
      createMeetingMutation.isPending || updateMeetingMutation.isPending,
    isError: createMeetingMutation.isError || updateMeetingMutation.isError,
    isSuccess:
      createMeetingMutation.isSuccess || updateMeetingMutation.isSuccess,
    error: createMeetingMutation.error || updateMeetingMutation.error,
  };
};

export default useMeetingFormMutation;
