'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import useDebounce from '@/hooks/useDebounde';
import { emailValidation } from '@/util/validation';
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { IInputProps, ISignupFormData } from 'types/auth';

export interface IEmailInputProps extends IInputProps<ISignupFormData> {
  isEmailCheck: boolean;
  handleEmailCheck: () => void;
  setIsEmailCheck: Dispatch<SetStateAction<boolean>>;
}

const EmailInput = ({
  register,
  errors,
  isEmailCheck,
  handleEmailCheck,
  setIsEmailCheck,
  control,
  trigger,
}: IEmailInputProps) => {
  const email = useWatch({ control, name: 'email' });

  // 입력이 있다면 중복확인 버튼 활성화
  useEffect(() => {
    setIsEmailCheck(false);
  }, [email]);

  useDebounce({
    value: email,
    callBack: useCallback(() => {
      trigger?.('email');
    }, [email]),
  });

  return (
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
  );
};
export default EmailInput;
