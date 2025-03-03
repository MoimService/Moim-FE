type CategoryTitle = '모각코' | '스터디' | '사이드 프로젝트' | '취미';

interface TopMeeting {
  meetingId: number;
  isLike: boolean;
  likesCount: number;
  location: string;
  maxMember: number;
  memberCount: number;
  thumbnail: string;
  title: string;
}

interface IMeetingSearchCondition {
  keyword: string;
  skillArray: string[];
  sortField: string;
  lastMeetingId: number | null;
  size: number;
}

interface Sort {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  offset: number;
  sort: Sort;
  unpaged: boolean;
}

interface SearchMeeting {
  meetingId: number;
  meetingTitle: string;
  thumbnail: string;
  location: string;
  memberCount: number;
  maxMember: number;
  startDate: string;
  meetingSkillArray: string[];
  name: string;
  profilePic: string;
  isLike: boolean;
  likesCount: number;
}
interface Paginated<T> {
  pageable: Pageable;
  nextCursor: number;
  size: number;
  content: T[];
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export type {
  CategoryTitle,
  TopMeeting,
  Sort,
  Pageable,
  SearchMeeting,
  IMeetingSearchCondition,
  Paginated,
};
