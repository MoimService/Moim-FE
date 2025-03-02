// 회원가입 유효성 검사
export const nameValidation = {
  required: '닉네임을 입력해주세요.',
  minLength: {
    value: 2,
    message: '최소 2자 이상 입력해 주세요.',
  },
  maxLength: {
    value: 10,
    message: '최대 10자 이하로 입력해 주세요.',
  },
  pattern: {
    value: /^[가-힣a-zA-Z0-9]+$/,
    message: '한글(완성형), 영어, 숫자만 입력할 수 있습니다.',
  },
};

export const emailValidation = {
  required: '이메일을 입력해주세요.',
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: '올바른 이메일 형식이 아닙니다.',
  },
};

export const passwordValidation = {
  required: '비밀번호를 입력해주세요.',
  minLength: {
    value: 6,
    message: '비밀번호는 최소 8자 이상이어야 합니다.',
  },
  pattern: {
    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    message: '비밀번호는 영어와 숫자 포함 8자 이상이어야 합니다.',
  },
};

export const passwordCheckValidation = (password: string) => ({
  validate: (value: string) => {
    if (value === '') return true;
    return value === password || '비밀번호가 일치하지 않습니다.';
  },
});

export const positionValidation = {
  required: '포지션을 선택해 주세요.',
};

// 로그인 유효성 검사
export const loginEmailValidation = {
  required: '이메일을 입력해주세요.',
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: '올바른 이메일 형식이 아닙니다.',
  },
};

export const loginPasswordValidation = {
  required: '비밀번호를 입력해주세요.',
  minLength: {
    value: 6,
    message: '비밀번호는 최소 6자 이상이어야 합니다.',
  },
};
