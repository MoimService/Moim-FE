'use client';

import { Input } from '@/components/ui/Input';
import useDebounce from '@/hooks/useDebounde';
import { loginEmailValidation } from '@/util/validation';
import { useCallback } from 'react';
import { useWatch } from 'react-hook-form';
import { IInputProps, ILoginFormData } from 'types/auth';

const EmailInput = ({
  control,
  register,
  errors,
  trigger,
}: IInputProps<ILoginFormData>) => {
  const email = useWatch({ control, name: 'email' });

  useDebounce({
    value: email,
    callBack: useCallback(() => {
      trigger?.('email');
    }, [email]),
  });

  return (
    <>
      <label htmlFor="email" className="typo-head3 text-Cgray700">
        이메일
      </label>
      <Input
        id="email"
        className="mb-[20px] mt-[8px]"
        placeholder="이메일을 입력해주세요."
        {...register('email', loginEmailValidation)}
        errorMessage={errors.email?.message}
      />
    </>
  );
};

export default EmailInput;
