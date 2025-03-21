import { useToast } from '@/components/common/ToastContext';
import {
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '@/lib/serverActions';
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  deleteLogout,
  getEmailCheck,
  getNameCheck,
  postLogin,
  postSignup,
} from 'service/api/user';
import { ISignupFormData } from 'types/auth';

import { getBanner } from '../../service/api/mypageProfile';
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
      // accessToken 저장
      await setAccessToken(res.accessToken);

      // refreshToken 저장
      await setRefreshToken(res.refreshToken);

      // 로그인 성공 후 즉시 배너 데이터 가져와서 캐시에 저장
      try {
        const bannerData = await getBanner();
        if (bannerData) {
          queryClient.setQueryData(QUERY_KEYS.banner(), bannerData);
          console.log('로그인 후 배너 데이터 설정:', bannerData);
        }
      } catch (error) {
        console.error('로그인 후 배너 데이터 가져오기 실패:', error);
      }

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
  const { showToast } = useToast();
  return useMutation({
    mutationFn: (data: ISignupFormData) => postSignup(data),
    onSuccess: () => {
      /**
       * TODO
       * - 로그인 페이지로 리다이렉트
       * - 회원가입 성공 토스트바
       */
      onSuccessCallback();
      showToast('회원가입에 성공했습니다', 'success');
    },
  });
};

// 로그아웃
const useLogoutMutation = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteLogout(),
    onSuccess: async () => {
      // 토큰 삭제
      await removeAccessToken();
      await removeRefreshToken();

      // banner 쿼리 데이터 초기화
      queryClient.setQueryData(QUERY_KEYS.banner(), null);

      // 모든 캐시 지우기
      queryClient.invalidateQueries();

      // 로그아웃 관련 토스트바 노출
      showToast('로그아웃 되었습니다.', 'success');
    },
  });
};

export {
  useLoginMutation,
  useNameCheckMutation,
  useEmailCheckMutation,
  useSignupMutation,
  useLogoutMutation,
};
