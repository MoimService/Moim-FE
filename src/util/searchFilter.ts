import { CategoryTitle } from 'types/meeting';

import { SortFieldType } from '../type-clyde/common/pagination';

export const filterOptions: Array<{ value: SortFieldType; label: string }> = [
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

export const imageUrlByCategory = (category: string) => {
  switch (category) {
    case 'mogakco':
      return '/mogakco_cat.png';
    case 'hobby':
      return '/hobby_cat.png';
    case 'study':
      return '/read_cat.png';
    case 'side-project':
      return '/side-project_cat.png';
    default:
      return '/mogakco_cat.png';
  }
};
