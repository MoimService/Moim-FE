// 폼 데이터 타입 정의
export interface IFormData {
  name: string;
  intro: string;
  position: string;
  gender: string;
  age: string;
  location: string;
}

// 사용자 정의 아이콘 Props 타입 정의
export interface IIconProps {
  size?: number;
  className?: string;
  color?: string;
}

// 프로필 업데이트를 위한 타입 정의
export interface IProfileUpdateRequest {
  name: string;
  intro: string;
  position: string;
  gender: string;
  age: string;
  location: string;
}

// 연락처 정보 타입 정의
export interface IContactResponse {
  phone: string;
  github: string;
  kakao: string;
  blog: string;
}

// 통합된 프로필 응답 타입 정의
export interface IProfileResponse {
  statusCode: number;
  data: {
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
  };
  timestamp: string;
}

// 프로필 업데이트 응답 타입 정의
export interface IProfileUpdateResponse {
  statusCode: number;
  data: {
    userId: number;
  };
  timestamp: string;
}

// 연락 수단 업데이트 요청 타입 정의
export interface IContactInfoUpdateRequest {
  phone: string;
  kakao: string;
  github: string;
  blog: string;
}

// 연락 수단 업데이트 응답 타입 정의
export interface IContactInfoUpdateResponse {
  statusCode: number;
  data: {
    userId: number;
  };
  timestamp: string;
}

// 프로필 이미지 업데이트 요청 타입 정의
export interface IProfileImageUpdateRequest {
  profilePicBase64: string;
  profilePicName: string;
}

// 프로필 이미지 업데이트 응답 타입 정의
export interface IProfileImageUpdateResponse {
  statusCode: number;
  data: {
    userId: number;
  };
  timestamp: string;
}
// 비밀번호 업데이트 요청 타입
export interface IPasswordUpdateRequest {
  currentPassword: string;
  newPassword: string;
  passwordCheck: string;
}

// 비밀번호 업데이트 응답 타입
export interface IPasswordUpdateResponse {
  statusCode: number;
  data: {
    userId: number;
  };
  timestamp: string;
}

export interface IPasswordUpdateResponse {
  success: boolean;
  message?: string;
}

// 서버 에러 응답 타입 정의
export interface ErrorResponse {
  message?: string;
  code?: string;
}
