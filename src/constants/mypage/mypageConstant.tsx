import { Code, Compass, Mars, Paintbrush, Venus, X } from 'lucide-react';

import { IIconProps } from '../../types/mypageTypes';

// 탭 타입 상수
export const TAB_TYPES = {
  BASIC: 'basic',
  CONTACT: 'contact',
  TECH: 'tech',
  PASSWORD: 'password',
};

// 파일 크기 제한
export const MAX_FILE_SIZE = 500 * 1024; // 500KB

// 자기소개 최대 글자수
export const MAX_INTRO_LENGTH = 250;

// 아이콘 크기
export const ICON_SIZES = {
  MOBILE: 18,
  DESKTOP: 25,
};

// 기본값 상수
export const DEFAULT_VALUES = {
  GENDER: '비공개',
  LOCATION: '선택 안함',
  AGE: '선택 안함',
};

// 성별 옵션
export const GENDER_OPTIONS = [
  {
    value: '남자',
    icon: (props: IIconProps) => <Mars {...props} />,
  },
  {
    value: '여자',
    icon: (props: IIconProps) => <Venus {...props} />,
  },
  {
    value: '비공개',
    icon: (props: IIconProps) => <X {...props} />,
  },
];

// 포지션 옵션
export const POSITION_OPTIONS = [
  {
    value: '프론트엔드',
    label: '프론트엔드',
    icon: (props: IIconProps) => <Code {...props} />,
  },
  {
    value: '백엔드',
    label: '백엔드',
    icon: (props: IIconProps) => <Compass {...props} />,
  },
  {
    value: '디자이너',
    label: '디자이너',
    icon: (props: IIconProps) => <Paintbrush {...props} />,
  },
  {
    value: '선택 안함',
    label: '선택 안함',
    icon: (props: IIconProps) => <X {...props} />,
  },
];

// 연령대 옵션
export const AGE_OPTIONS = [
  { value: '10대', label: '10대' },
  { value: '20대', label: '20대' },
  { value: '30대', label: '30대' },
  { value: '40대', label: '40대' },
  { value: '50대이상', label: '50대이상' },
  { value: '선택 안함', label: '선택 안함' },
];

// 지역 옵션
export const LOCATION_OPTIONS = [
  { value: '서울', label: '서울' },
  { value: '경기', label: '경기' },
  { value: '인천', label: '인천' },
  { value: '부산', label: '부산' },
  { value: '대구', label: '대구' },
  { value: '광주', label: '광주' },
  { value: '대전', label: '대전' },
  { value: '울산', label: '울산' },
  { value: '세종', label: '세종' },
  { value: '강원', label: '강원' },
  { value: '충북', label: '충북' },
  { value: '충남', label: '충남' },
  { value: '전북', label: '전북' },
  { value: '전남', label: '전남' },
  { value: '경북', label: '경북' },
  { value: '경남', label: '경남' },
  { value: '제주', label: '제주' },
  { value: '선택 안함', label: '선택 안함' },
];

export const MY_MEETING_TAB_LIST = [
  {
    label: '내가 만든 모임',
    value: 'created',
    url: '/my-meeting/my',
  },
  {
    label: '내가 참여하고 있는 모임',
    value: 'joined',
    url: '/my-meeting/my',
  },
];

export const MY_COMMENT_TAB_LIST = [
  {
    label: '리뷰 작성 가능한 모임',
    value: 'writable',
    url: '/my-meeting/comments',
  },
  {
    label: '작성한 리뷰',
    value: 'written',
    url: '/my-meeting/comments',
  },
];
