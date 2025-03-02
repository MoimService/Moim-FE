'use client';

import { Input } from '@/components/ui/Input';
import useDebounce from '@/hooks/useDebounde';
import { passwordCheckValidation } from '@/util/validation';
import { useCallback } from 'react';
import { useWatch } from 'react-hook-form';

import { IPasswordInputProps } from './PasswordInput';

const PasswordCheckInput = ({
  register,
  dirtyFields,
  errors,
  control,
  trigger,
}: IPasswordInputProps) => {
  const password = useWatch({ control, name: 'password' });
  const passwordCheck = useWatch({ control, name: 'passwordCheck' });

  useDebounce({
    value: passwordCheck,
    callBack: useCallback(() => {
      trigger?.('passwordCheck');
    }, [passwordCheck]),
  });

  return (
    <div className="flex flex-col gap-[8px]">
      <label htmlFor="passwordCheck" className="typo-head3 text-Cgray700">
        비밀번호 확인
      </label>
      <Input
        id="passwordCheck"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        {...register('passwordCheck', passwordCheckValidation(password))}
        state={dirtyFields.passwordCheck ? 'success' : 'default'}
        errorMessage={errors.passwordCheck?.message}
      />
    </div>
  );
};

export default PasswordCheckInput;
