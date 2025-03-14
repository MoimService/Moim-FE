export const API_VERSIONS = {
  V1: 'v1',
  V2: 'v2',
  V3: 'v3',
};

export const CURRENT_API_VERSION = `/api/${API_VERSIONS.V1}`;

// 마이페이지 관련 API 엔드포인트
export const mypageURL = {
  profilePic: `${CURRENT_API_VERSION}/mypage/profilepic`,
  profile: `${CURRENT_API_VERSION}/mypage/profile`,
  password: `${CURRENT_API_VERSION}/mypage/password`,
  contact: `${CURRENT_API_VERSION}/mypage/contact`,
  skills: `${CURRENT_API_VERSION}/mypage/skills`,
  comments: `${CURRENT_API_VERSION}/mypage/comments`,
  mettingComments: `${CURRENT_API_VERSION}/mypage/meeting-comment`,
  banner: `${CURRENT_API_VERSION}/mypage/banner`,
};

// 미팅 관련 API 엔드포인트
export const myMeetingURL = {
  memberStatus: `${CURRENT_API_VERSION}/mymeetings/member-status`,
  isPublic: (meetingId: number) =>
    `${CURRENT_API_VERSION}/mymeetings/isPublic/${meetingId}`,
  expel: `${CURRENT_API_VERSION}/mymeetings/expel`,
  memberProfile: `${CURRENT_API_VERSION}/mymeetings/member-profile`,
  manage: `${CURRENT_API_VERSION}/mymeetings/manage`,
  likes: `${CURRENT_API_VERSION}/mymeetings/likes`,
  all: `${CURRENT_API_VERSION}/mymeetings/all`,
  quit: (meetingId: number) =>
    `${CURRENT_API_VERSION}/mymeetings/quit/${meetingId}`,
  cancel: (meetingId: number) =>
    `${CURRENT_API_VERSION}/mymeetings/cancel/${meetingId}`,
};

// 댓글 관련 API 엔드포인트
export const commentURL = {
  get: (meetingId: number) => `${CURRENT_API_VERSION}/comments/${meetingId}`,
  update: (meetingId: number) => `${CURRENT_API_VERSION}/comments/${meetingId}`,
  create: (meetingId: number) => `${CURRENT_API_VERSION}/comments/${meetingId}`,
  delete: (meetingId: number) => `${CURRENT_API_VERSION}/comments/${meetingId}`,
  count: (meetingId: number) =>
    `${CURRENT_API_VERSION}/comments/count/${meetingId}`,
  average: (meetingId: number) =>
    `${CURRENT_API_VERSION}/comments/avg/${meetingId}`,
};

// 미팅 가입신청 메시지 엔드포인트
export const memberURL = {
  create: (meetingId: number) => `${CURRENT_API_VERSION}/members/${meetingId}`,
};

// 미팅 관련 API 엔드포인트
export const meetingURL = {
  create: `${CURRENT_API_VERSION}/meetings`,
  search: `${CURRENT_API_VERSION}/meetings/search`,
  top: `${CURRENT_API_VERSION}/meetings/top`,
  detail: (meetingId: number) =>
    `${CURRENT_API_VERSION}/meetings/detail/${meetingId}`,
  managerDetail: (meetingId: number) =>
    `${CURRENT_API_VERSION}/meetings/detail/manager/${meetingId}`,
};

// 좋아요 관련 API 엔드포인트
export const likesURL = {
  create: (meetingId: number) =>
    `${CURRENT_API_VERSION}/meetings/${meetingId}/likes`,
  delete: (meetingId: number) =>
    `${CURRENT_API_VERSION}/meetings/${meetingId}/likes`,
};

// 인증 관련 API 엔드포인트
export const authURL = {
  signup: `${CURRENT_API_VERSION}/auths/signup`,
  login: `${CURRENT_API_VERSION}/auths/login`,
  checkName: `${CURRENT_API_VERSION}/auths/signup/name`,
  checkEmail: `${CURRENT_API_VERSION}/auths/signup/email`,
};

export const URLs = {
  mypage: mypageURL,
  myMeeting: myMeetingURL,
  comment: commentURL,
  member: memberURL,
  meeting: meetingURL,
  likes: likesURL,
  auth: authURL,
};
