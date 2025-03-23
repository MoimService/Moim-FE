export type UserPosition = '프론트엔드' | '백엔드' | '디자이너' | '선택 안함';

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData extends LoginFormData {
  position: string;
  password: string;
  passwordCheck: string;
}
