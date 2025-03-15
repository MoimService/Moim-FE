import axiosInstance from '@/lib/axios/axiosInstance';
import { Paginated } from 'types/meeting';

export interface ICommentsCount {
  fives: number;
  fours: number;
  threes: number;
  twos: number;
  ones: number;
}

export interface Comment {
  commentId: number;
  score: number;
  content: string;
  createdAt: string;
  meetingId: number;
  userName?: string;
  profilePic?: string;
}

const getCommentsCount = async (meetingId: number): Promise<ICommentsCount> => {
  const res = await axiosInstance.get(`/api/v1/comments/count/${meetingId}`);
  return res.data.data;
};

const getCommentsMeeting = async (
  meetingId: number,
  lastCommentId: number,
): Promise<Paginated<Comment>> => {
  const res = await axiosInstance.get(
    `/api/v1/comments/${meetingId}?lastCommentId=${lastCommentId}&size=3`,
  );
  return res.data.data;
};

const postComment = async (
  meetingId: number,
  req: { score: number; content: string },
) => {
  const res = await axiosInstance.post(`/api/v1/comments/${meetingId}`, req);
  return res.data.data;
};

export { getCommentsCount, getCommentsMeeting, postComment };
