'use client';

import { Button } from '@/components/ui/Button';
import useSignUpForm from '@/hooks/useSignupForm';
import Link from 'next/link';

import EmailInput from './EmailInput';
import NameInput from './NameInput';
import PasswordCheckInput from './PasswordCheckInput';
import PasswordInput from './PasswordInput';
import PositionInput from './PositionInput';

const SignupForm = () => {
  const {
    handleSubmit,
    onSubmit,
    register,
    errors,
    isNameCheck,
    handleNameCheck,
    isEmailCheck,
    handleEmailCheck,
    handleClickPosition,
    dirtyFields,
    control,
    setIsNameCheck,
    setIsEmailCheck,
    trigger,
  } = useSignUpForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-[544px] flex-col rounded-[16px] bg-BG_2 p-[40px]"
    >
      <div>
        <h2 className="typo-head2 mb-[40px] text-center text-white">
          회원가입
        </h2>
        <div className="flex flex-col gap-[24px]">
          <NameInput
            register={register}
            errors={errors}
            isNameCheck={isNameCheck}
            handleNameCheck={handleNameCheck}
            setIsNameCheck={setIsNameCheck}
            control={control}
            trigger={trigger}
          />

          <EmailInput
            register={register}
            errors={errors}
            isEmailCheck={isEmailCheck}
            handleEmailCheck={handleEmailCheck}
            setIsEmailCheck={setIsEmailCheck}
            control={control}
            trigger={trigger}
          />

          <PositionInput
            register={register}
            errors={errors}
            control={control}
            handleClickPosition={handleClickPosition}
          />

          <PasswordInput
            register={register}
            errors={errors}
            dirtyFields={dirtyFields}
            control={control}
            trigger={trigger}
          />

          <PasswordCheckInput
            register={register}
            errors={errors}
            dirtyFields={dirtyFields}
            control={control}
            trigger={trigger}
          />
        </div>
      </div>
      <div className="mb-[20px] mt-[48px] flex flex-col">
        <Button type="submit" className="w-full">
          회원가입
        </Button>
      </div>
      <div className="flex justify-between">
        <p className="text-Cgray700">이미 회원이신가요?</p>
        <Link href="/login" className="text-main underline">
          로그인
        </Link>
      </div>
    </form>
  );
};

export default SignupForm;
