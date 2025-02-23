'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import useSignUpForm from '@/hooks/useSignupForm';
import {
  emailValidation,
  nameValidation,
  passwordCheckValidation,
  passwordValidation,
  positionValidation,
} from '@/util/validation';
import Link from 'next/link';

import { ChipContainer } from './ChipContainer';

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
    watch,
    handleClickPosition,
    dirtyFields,
    setFocusedField,
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
          <div className="flex flex-col gap-[8px]">
            <label htmlFor="name" className="typo-head3 text-Cgray700">
              닉네임
            </label>
            <div className="flex flex-row  gap-[8px]">
              <Input
                id="name"
                className="h-full"
                placeholder="닉네임을 입력해주세요."
                {...register('name', nameValidation)}
                errorMessage={errors.name?.message}
                state={isNameCheck ? 'success' : 'default'}
                onFocus={() => setFocusedField('name')}
              />
              <Button
                disabled={isNameCheck}
                variant={'outline'}
                size={'sm'}
                className="h-[50px]"
                type="button"
                onClick={handleNameCheck}
              >
                중복확인
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-[8px]">
            <label htmlFor="id" className="typo-head3 text-Cgray700">
              이메일
            </label>
            <div className="flex flex-row  gap-[8px]">
              <Input
                id="email"
                className=" h-full"
                placeholder="이메일을 입력해주세요."
                {...register('email', emailValidation)}
                state={isEmailCheck ? 'success' : 'default'}
                errorMessage={errors.email?.message}
                onFocus={() => setFocusedField('email')}
              />
              <Button
                disabled={isEmailCheck}
                variant={'outline'}
                size={'sm'}
                className="h-[50px]"
                onClick={handleEmailCheck}
                type="button"
              >
                중복확인
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-[8px]">
            <label htmlFor="id" className="typo-head3 text-Cgray700">
              포지션
            </label>
            <ChipContainer
              position={watch('position')}
              setPosition={handleClickPosition}
            />
            {errors.position?.message && (
              <p className="typo-caption1 mt-[10px] px-[10px] text-warning">
                {errors.position?.message}
              </p>
            )}
            <input
              type="hidden"
              {...register('position', positionValidation)}
            />
          </div>

          <div className="flex flex-col gap-[8px]">
            <label htmlFor="password" className="typo-head3 text-Cgray700">
              비밀번호
            </label>
            <Input
              id="password"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              {...register('password', passwordValidation)}
              state={dirtyFields.password ? 'success' : 'default'}
              errorMessage={errors.password?.message}
              onFocus={() => setFocusedField('password')}
            />
          </div>

          <div className="flex flex-col gap-[8px]">
            <label htmlFor="pw" className="typo-head3 text-Cgray700">
              비밀번호 확인
            </label>
            <Input
              id="passwordCheck"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              {...register(
                'passwordCheck',
                passwordCheckValidation(watch('password')),
              )}
              state={dirtyFields.passwordCheck ? 'success' : 'default'}
              errorMessage={errors.passwordCheck?.message}
              onFocus={() => setFocusedField('passwordCheck')}
            />
          </div>
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
