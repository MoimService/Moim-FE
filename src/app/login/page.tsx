'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useLoginMutation } from '@/hooks/mutations/useUserMutation';
import useDebounce from '@/hooks/useDebounde';
import { getAccessToken } from '@/lib/serverActions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface ILoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<ILoginFormData>({
    mode: 'onBlur',
  });
  const router = useRouter();
  const [focusedField, setFocusedField] = useState<'email' | 'password' | null>(
    null,
  );

  // 이메일 포커스 1초 뒤 유효성 검사
  useDebounce({
    value: watch('email'),
    delay: 1000,
    callBack: () => {
      if (focusedField) {
        trigger(focusedField);
      }
    },
  });

  // 비밀번호 포커스 1초 뒤 유효성 검사
  useDebounce({
    value: watch('password'),
    delay: 1000,
    callBack: () => {
      if (focusedField) {
        trigger(focusedField);
      }
    },
  });

  const { mutate } = useLoginMutation({
    onSuccessCallback: () => router.push('/'),
  });

  // 로그인 이미 됐다면 메인페이지로 이동
  useEffect(() => {
    const checkLoginStatus = async () => {
      const accessToken = await getAccessToken();
      if (accessToken !== null) {
        router.push('/');
      } else {
        /**
         * TODO
         * 쿠키 불러오는 로딩 상태 관리
         */
      }
      return accessToken;
    };

    checkLoginStatus();
  }, []);

  const onSubmit = async (data: ILoginFormData) => {
    mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-[544px] flex-col gap-[48px] rounded-[16px] bg-BG_2 p-[40px]"
      >
        <div>
          <h2 className="typo-head2 mb-[40px] text-center text-white">
            로그인
          </h2>
          <div>
            <label htmlFor="email" className="typo-head3 text-Cgray700">
              아이디
            </label>
            <Input
              id="email"
              className="mb-[20px] mt-[8px]"
              placeholder="아이디를 입력해주세요."
              {...register('email', {
                required: '아이디를 입력해주세요.',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: '올바른 이메일 형식이 아닙니다.',
                },
              })}
              errorMessage={errors.email?.message}
              onFocus={() => setFocusedField('email')}
            />
            <label htmlFor="pw" className="typo-head3 text-Cgray700">
              비밀번호
            </label>
            <Input
              id="password"
              type="password"
              className="mb-[20px] mt-[8px]"
              placeholder="비밀번호를 입력해주세요."
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
                minLength: {
                  value: 6,
                  message: '비밀번호는 최소 6자 이상이어야 합니다.',
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                  message: '비밀번호는 영문과 숫자를 포함해야 합니다.',
                },
              })}
              errorMessage={errors.password?.message}
              onFocus={() => setFocusedField('password')}
            />

            <div className="flex justify-between">
              <p className="text-Cgray700">비밀번호를 잊으셨나요?</p>
              <Link href="/" className="text-main underline">
                비밀번호 수정
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[16px]">
          <Button type="submit" className="w-full">
            로그인
          </Button>
          <Button type="button" className="w-full" variant={'outline'}>
            회원가입
          </Button>
        </div>
      </form>
    </div>
  );
}
