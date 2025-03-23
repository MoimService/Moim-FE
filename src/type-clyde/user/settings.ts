export interface ProfileUpdateRequest {
  name: string;
  intro: string;
  position: string;
  gender: string;
  age: string;
  location: string;
}

export interface ContactInfoUpdateRequest {
  phone: string;
  kakao: string;
  github: string;
  blog: string;
}

export interface ProfileImageUpdateRequest {
  profilePicBase64: string;
  profilePicName: string;
}

export interface PasswordUpdateRequest {
  currentPassword: string;
  newPassword: string;
  passwordCheck: string;
}
