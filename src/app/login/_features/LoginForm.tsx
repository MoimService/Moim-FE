'use client';

import { Button } from '@/components/ui/Button';
import useLoginForm from '@/hooks/useLoginForm';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';

const LoginForm = () => {
  const router = useRouter();
  const { register, handleSubmit, onSubmit, errors, control, trigger } =
    useLoginForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-[544px] flex-col gap-[48px] rounded-[16px] bg-BG_2 p-[40px]"
    >
      <div>
        <h2 className="typo-head2 mb-[40px] text-center text-white">로그인</h2>
        <div>
          <EmailInput
            control={control}
            register={register}
            errors={errors}
            trigger={trigger}
          />
          <PasswordInput
            control={control}
            register={register}
            errors={errors}
            trigger={trigger}
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
        <Button
          type="button"
          className="w-full"
          variant={'outline'}
          onClick={() => router.push('/signup')}
        >
          회원가입
        </Button>
      </div>
    </form>
  );
};
export default LoginForm;
