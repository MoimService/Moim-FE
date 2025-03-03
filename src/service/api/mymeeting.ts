import { Member } from '@/app/(user-page)/my-meeting/my/page';
import { authAPI } from '@/lib/axios/authApi';
import { Paginated } from 'types/meeting';
import { IContactResponse } from 'types/mypageTypes';

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
const getMyMeetingManage = async (
  lastMeetingId: number,
): Promise<Paginated<IMyMeetingManage>> => {
  const res = await authAPI.get(
    `/api/v1/mymeetings/manage?lastMeetingId=${lastMeetingId}&size=${6}`,
  );
  console.log('[getMyMeetingManage]: res.data:', res.data);

  return res.data.data;
};

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

const getMyMeetingMemberProfile = async ({
  userId,
  meetingId,
}: {
  userId?: number;
  meetingId: number;
}): Promise<IMemberProfile> => {
  const res = await authAPI.get(
    `/api/v1/mymeetings/member-profile?userId=${userId}&meetingId=${meetingId}`,
  );

  return res.data.data;
};

export { getMyMeetingManage, getMyMeetingMemberProfile };
