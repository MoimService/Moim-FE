import { MeetingBase } from './base';

export interface TopMeeting extends MeetingBase {
  isLike: boolean;
  likesCount: number;
}

export interface SearchMeeting extends MeetingBase {
  meetingTitle: string;
  startDate: string;
  meetingSkillArray: string[];
  name: string;
  profilePic: string;
  isLike: boolean;
  likesCount: number;
}

export interface CreateMeetingResponse {
  meetingId: number;
}
