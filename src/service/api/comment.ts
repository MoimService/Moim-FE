import axiosInstance from '@/lib/axios/axiosInstance';

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
  userName: string;
  profilePic: string;
}

export interface Comments {
  content: Comment[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      empty: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  nextCursor: null | number;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

const getCommentsCount = async (meetingId: number): Promise<ICommentsCount> => {
  const res = await axiosInstance.get(`/api/v1/comments/count/${meetingId}`);
  return res.data.data;
};

const getCommentsMeeting = async (
  meetingId: number,
  lastCommentId: number,
): Promise<Comments> => {
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
