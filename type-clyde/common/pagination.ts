export type SortFieldType = 'CREATED' | 'OLD' | 'LIKES';

export interface Sort {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  offset: number;
  sort: Sort;
  unpaged: boolean;
}

export interface Paginated<T> {
  pageable: Pageable;
  nextCursor: number;
  size: number;
  content: T[];
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
