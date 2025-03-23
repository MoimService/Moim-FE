export type MemberStatus = 'APPROVED' | 'REJECTED' | 'PENDING' | 'EXPEL';

export interface Member {
  userId: number;
  profilePic: string;
  name: string;
  memberStatus: MemberStatus;
}
