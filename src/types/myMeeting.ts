import { CategoryTitle } from './meeting';
import { IContactResponse } from './mypageTypes';

interface Member {
  userId: number;
  profilePic: string;
  name: string;
  memberStatus: 'APPROVED' | 'REJECTED' | 'PENDING' | 'EXPEL';
}

interface Meeting {
  meetingId: number;
  title: string;
  thumbnail: string;
  location: string;
  memberCount: number;
  maxMember: number;
  isPublic: boolean;
  memberList: Member[];
}

interface IMyMeetingManage {
  meetingId: number;
  title: string;
  thumbnail: string;
  location: string;
  memberCount: number;
  maxMember: number;
  likesCount: number;
  isPublic: boolean;
  memberList: Member[];
}

interface IMyMeetingParticipated {
  categoryTitle: CategoryTitle;
  meetingId: number;
  title: string;
  thumbnail: string;
  location: string;
  memberCount: number;
  maxMember: number;
  likesCount: number;
  myMemberStatus: 'APPROVED' | 'REJECTED' | 'PENDING' | 'EXPEL';
  memberList: Member[];
}

interface IMyMeetingLikes {
  meetingId: number;
  categoryTitle: CategoryTitle;
  title: string;
  thumbnail: string;
  location: string;
  memberCount: number;
  maxMember: number;
  likesCount: number;
}

interface IUserProfile {
  userId: number;
  name: string;
  profilePic: string;
  intro: string;
  email: string;
  position: string;
  gender: string;
  age: string;
  location: string;
  skillArray: string[];
  contactResponse: IContactResponse;
}

interface IMemberProfile extends IUserProfile {
  memberResponse: {
    memberId: number;
    message: string;
  };
}

interface IBanner {
  email: string;
  name: string;
  phone: string;
  profilePic: string;
  userId: number;
}

interface UserData {
  id: number;
  name: string;
  status: 'APPROVED' | 'REJECTED' | 'PENDING' | 'EXPEL';
  introduction: string;
  profilePic: string;
}

export type {
  Member,
  Meeting,
  IMyMeetingManage,
  IUserProfile,
  IMemberProfile,
  IBanner,
  UserData,
  IMyMeetingParticipated,
  IMyMeetingLikes,
};
