export type CategoryTitle = '모각코' | '스터디' | '사이드 프로젝트' | '취미';

export interface MeetingBase {
  meetingId: number;
  title: string;
  thumbnail: string;
  location: string;
  memberCount: number;
  maxMember: number;
}
