import { ApiResponse } from 'type-clyde/common/api';

// 사용자 정보
export interface UserBaseInfo {
  name: string;
  intro: string;
  position: string;
  gender: string;
  age: string;
  location: string;
}

// 아이콘 속성
export interface IIconProps {
  size?: number;
  className?: string;
  color?: string;
}

// 연락처 정보
export interface ContactInfo {
  phone: string;
  github: string;
  kakao: string;
  blog: string;
}

// 사용자 프로필 데이터
export interface UserProfile extends UserBaseInfo {
  userId: number;
  profilePic: string;
  email: string;
  skillArray: string[];
  contactResponse: ContactInfo;
}

// 요청 타입
export interface ProfileUpdateRequest extends UserBaseInfo {}
export interface ContactInfoUpdateRequest extends ContactInfo {}
export interface ProfileImageUpdateRequest {
  profilePicBase64: string;
  profilePicName: string;
}
export interface PasswordUpdateRequest {
  currentPassword: string;
  newPassword: string;
  passwordCheck: string;
}

export interface BasicUserResponse {
  userId: number;
}

// API 응답 타입들
export type ProfileResponse = ApiResponse<UserProfile>;
export type ProfileUpdateResponse = ApiResponse<BasicUserResponse>;
export type ContactInfoUpdateResponse = ApiResponse<BasicUserResponse>;
export type ProfileImageUpdateResponse = ApiResponse<BasicUserResponse>;
export type PasswordUpdateResponse = ApiResponse<BasicUserResponse>;
