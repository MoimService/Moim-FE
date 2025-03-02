import { CategoryTitle } from 'types/meeting';

export const filterOptions = [
  {
    value: 'NEW',
    label: '최신순',
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
