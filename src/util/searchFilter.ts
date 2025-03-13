import { CategoryTitle } from 'types/meeting';

export const filterOptions = [
  {
    value: 'CREATED',
    label: '생성순',
  },
  {
    value: 'OLD',
    label: '오래된순',
  },
  {
    value: 'LIKES',
    label: '좋아요순',
  },
];

export const translateCategoryNameToKor = (category: string): CategoryTitle => {
  switch (category) {
    case 'mogakco':
      return '모각코';
    case 'hobby':
      return '취미';
    case 'study':
      return '스터디';
    case 'side-project':
      return '사이드 프로젝트';
    default:
      return '모각코';
  }
};

export const translateCategoryNameToEng = (category: string) => {
  switch (category) {
    case '모각코':
      return 'mogakco';
    case '취미':
      return 'hobby';
    case '스터디':
      return 'study';
    case '사이드 프로젝트':
      return 'side-project';
    default:
      return 'mogakco';
  }
};
