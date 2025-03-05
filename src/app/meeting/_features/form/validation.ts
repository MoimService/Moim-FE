export const meetingTitleValidation = {
  required: '모임 이름은 필수입니다',
  maxLength: {
    value: 50,
    message: '모임 이름은 최대 50자까지 입력 가능합니다',
  },
};

// 모임 유형 유효성 검사
export const meetingTypeValidation = {
  required: '모임 유형을 선택해주세요',
};

// 모임 장소 유효성 검사
export const locationValidation = {
  required: '모임 장소는 필수입니다',
  maxLength: {
    value: 100,
    message: '모임 장소는 최대 100자까지 입력 가능합니다',
  },
};

// 시작 날짜 유효성 검사
export const startDateValidation = {
  required: '시작 날짜는 필수입니다',
};

// 모임 정원 유효성 검사
export const memberLimitValidation = {
  required: '모임 정원은 필수입니다',
  min: {
    value: 2,
    message: '모임 정원은 최소 2명 이상이어야 합니다',
  },
  max: {
    value: 100,
    message: '모임 정원은 최대 100명까지 가능합니다',
  },
  valueAsNumber: true,
};

// 이미지 유효성 검사 메시지
export const imageValidationMessages = {
  required: '대표 이미지는 필수입니다',
  sizeError: (maxSize: number) =>
    `이미지 크기는 최대 ${maxSize}MB까지 가능합니다`,
  formatError: '지원되는 이미지 형식만 업로드 가능합니다 (JPG, PNG, JPEG)',
};

// 모임 설명 유효성 검사
export const descriptionValidation = {
  required: '모임 설명은 필수입니다',
  minLength: {
    value: 10,
    message: '모임 설명은 최소 10자 이상 입력해주세요',
  },
  maxLength: {
    value: 1000,
    message: '모임 설명은 최대 1000자까지 입력 가능합니다',
  },
};

// 기술 스택 유효성 검사
export const techStackValidation = {
  required: '사용 기술을 선택해주세요',
};

// 기술 스택 관련 상수
export const TECH_STACK_CONFIG = {
  MAX_SELECTIONS: 5,
};
