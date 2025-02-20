import { setAccessToken } from '@/lib/serverActions';
import { useMutation } from '@tanstack/react-query';
import { postLogin } from 'service/api/user';

const useLoginMutation = ({
  onSuccessCallback,
}: {
  onSuccessCallback: () => void;
}) => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      postLogin({ email, password }),
    onSuccess: async (res) => {
      // 쿠키 저장
      const accessToken = res.headers.token;
      if (accessToken) {
        await setAccessToken(accessToken);
      }

      // 메인페이지로 리다이렉트
      onSuccessCallback();
    },
    onError: () => {
      console.log('로그인 에러');
    },
  });
};

export { useLoginMutation };
