import { useToast } from '@/components/common/ToastContext';
import { setAccessToken, setRefreshToken } from '@/lib/serverActions';
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  getEmailCheck,
  getNameCheck,
  postLogin,
  postSignup,
} from 'service/api/user';
import { ISignupFormData } from 'types/auth';

import { QUERY_KEYS } from '../queries/useMyPageQueries';

const useLoginMutation = ({
  onSuccessCallback,
}: {
  onSuccessCallback: () => void;
}) => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      postLogin({ email, password }),
    onSuccess: async (res) => {
      // 유저 정보 불러오기
      console.log('유저 정보 invalidate');
      // queryClient.invalidateQueries({ queryKey: QUERY_KEYS.banner() });

      // refreshToken 저장
      await setRefreshToken(res.refreshToken);

      showToast('로그인 성공', 'success');
      // 메인페이지로 리다이렉트
      onSuccessCallback();
    },
    onError: () => {
      showToast('이메일 또는 비밀번호가 틀렸습니다.', 'error');
    },
  });
};

// 닉네임 중복 검사
const useNameCheckMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: {
  onSuccessCallback: () => void;
  onErrorCallback: () => void;
}) => {
  return useMutation({
    mutationFn: (name: string) => getNameCheck(name),
    onSuccess: () => {
      // 중복 검사 성공
      /**
       * TODO
       * - 중복확인 버튼 비활성화
       */
      onSuccessCallback();
    },
    onError: () => {
      // 중복 검사 실패
      onErrorCallback();
    },
  });
};

// 이메일 중복 검사
const useEmailCheckMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: {
  onSuccessCallback: () => void;
  onErrorCallback: () => void;
}) => {
  return useMutation({
    mutationFn: (email: string) => getEmailCheck(email),
    onSuccess: () => {
      // 중복 검사 성공
      /**
       * TODO
       * - 중복확인 버튼 비활성화
       */
      onSuccessCallback();
    },
    onError: () => {
      // 중복 검사 실패
      onErrorCallback();
    },
  });
};

// 회원가입
const useSignupMutation = ({
  onSuccessCallback,
}: {
  onSuccessCallback: () => void;
}) => {
  return useMutation({
    mutationFn: (data: ISignupFormData) => postSignup(data),
    onSuccess: () => {
      /**
       * TODO
       * - 로그인 페이지로 리다이렉트
       * - 회원가입 성공 토스트바
       */
      onSuccessCallback();
    },
  });
};

export {
  useLoginMutation,
  useNameCheckMutation,
  useEmailCheckMutation,
  useSignupMutation,
};
