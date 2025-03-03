import { Member } from '@/app/(user-page)/my-meeting/my/page';
import { authAPI } from '@/lib/axios/authApi';
import { Paginated } from 'types/meeting';

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

export { getMyMeetingManage };
