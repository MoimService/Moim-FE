export interface CreateMeetingPayload {
  meetingTitle: string;
  categoryTitle: string;
  imageName: string;
  imageEncodedBase64: string;
  content: string;
  location: string;
  maxMember: number;
  startDate: string;
  isPublic: boolean;
  requireApproval: boolean;
  skillArray: string[];
}
