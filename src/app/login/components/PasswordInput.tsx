'use client';

import { Input } from '@/components/ui/Input';
import useDebounce from '@/hooks/useDebounde';
import { loginPasswordValidation } from '@/util/validation';
import { useCallback } from 'react';
import { useWatch } from 'react-hook-form';
import { IInputProps, ILoginFormData } from 'types/auth';

const PasswordInput = ({
  control,
  register,
  errors,
  trigger,
}: IInputProps<ILoginFormData>) => {
  const password = useWatch({ control, name: 'password' });

  useDebounce({
    value: password,
    callBack: useCallback(() => {
      trigger?.('password');
    }, [password]),
  });

  return (
    <>
      <label htmlFor="password" className="typo-head3 text-Cgray700">
        비밀번호
      </label>
      <Input
        {...register('password', loginPasswordValidation)}
        id="password"
        type="password"
        className="mb-[20px] mt-[8px]"
        placeholder="비밀번호를 입력해주세요."
        errorMessage={errors.password?.message}
      />
    </>
  );
};

export default PasswordInput;
