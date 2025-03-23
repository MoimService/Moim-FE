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

export interface MyComment extends Comment {
  meetingTitle: string;
  thumbnail: string;
  location: string;
  memberCount: number;
  maxMember: number;
  categoryTitle: string;
}
