import { SortFieldType } from '../common/pagination';

export interface IMeetingSearchCondition {
  keyword: string;
  skillArray: string[];
  sortField: SortFieldType;
  lastMeetingId: number | null;
  size: number;
}
