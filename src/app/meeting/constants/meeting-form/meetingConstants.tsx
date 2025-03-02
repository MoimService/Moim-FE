import { BookOpen, Code, CodeXml, Palette } from 'lucide-react';
import React from 'react';

// 모임 유형 옵션
export const MEETING_TYPES = [
  { id: 'mogakko', label: '모각코', icon: <Code className="h-5 w-5" /> },
  { id: 'study', label: '스터디', icon: <BookOpen className="h-5 w-5" /> },
  {
    id: 'sideproject',
    label: '사이드프로젝트',
    icon: <CodeXml className="h-5 w-5" />,
  },
  { id: 'hobby', label: '취미', icon: <Palette className="h-5 w-5" /> },
];

// 가입 방식 옵션
export const JOIN_METHODS = [
  { id: 'immediate', label: '바로 참가' },
  { id: 'approval', label: '승인 후 참가' },
];

// 모임 공개 여부 옵션
export const PRIVACY_OPTIONS = [
  { id: 'public', label: '공개' },
  { id: 'private', label: '비공개' },
];

// 이미지 관련 상수
export const IMAGE_CONFIG = {
  MAX_SIZE_MB: 5,
  ACCEPTED_FORMATS: ['.jpg', '.jpeg', '.png'],
  MIME_TYPES: ['image/jpeg', 'image/png', 'image/jpg'],
};
