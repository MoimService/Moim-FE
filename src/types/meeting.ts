type CategoryTitle = '모각코' | '스터디' | '사이드 프로젝트' | '취미';

interface ITopMeeting {
  meetingId: number;
  isLike: boolean;
  location: string;
  maxMember: number;
  memberCount: number;
  thumbnail: string;
  title: string;
}

// TODO: 변경 예정
interface Skill {
  skillTitle: string;
}

interface IMeeting {
  meetingId: number;
  isLike: boolean;
  location: string;
  maxMember: number;
  memberCount: number;
  thumbnail: string;
  meetingTitle: string;
  startDate: string;
  name: string;
  profilePic: string;
  meetingSkillResponse: Skill[];
}

interface IMeetingSearchCondition {
  keyword: string;
  skillArray: string[];
  sortField: string;
  lastMeetingId: number | null;
  size: number;
}

export type {
  CategoryTitle,
  Skill,
  ITopMeeting,
  IMeetingSearchCondition,
  IMeeting,
};
