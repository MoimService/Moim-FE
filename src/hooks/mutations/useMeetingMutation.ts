import { useMutation } from '@tanstack/react-query';
import { cancelLikeMeeting, likeMeeting } from 'service/api/meeting';

const useLikeMeeting = (meetingId: number, options = {}) => {
  return useMutation({
    mutationFn: () => likeMeeting(meetingId),
    ...options,
  });
};

const useCancelLikeMeeting = (meetingId: number, options = {}) => {
  return useMutation({
    mutationFn: () => cancelLikeMeeting(meetingId),
    ...options,
  });
};

export { useLikeMeeting, useCancelLikeMeeting };
