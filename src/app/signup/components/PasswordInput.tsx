'use client';

import { Input } from '@/components/ui/Input';
import useDebounce from '@/hooks/useDebounde';
import { passwordValidation } from '@/util/validation';
import { useCallback } from 'react';
import { useWatch } from 'react-hook-form';
import { IInputProps, ISignupFormData } from 'types/auth';

export interface IPasswordInputProps extends IInputProps<ISignupFormData> {
  dirtyFields: Partial<
    Readonly<{
      name?: boolean | undefined;
      email?: boolean | undefined;
      position?: boolean | undefined;
      password?: boolean | undefined;
      passwordCheck?: boolean | undefined;
    }>
  >;
}

const PasswordInput = ({
  register,
  control,
  trigger,
  dirtyFields,
  errors,
}: IPasswordInputProps) => {
  const password = useWatch({ control, name: 'password' });
  useDebounce({
    value: password,
    callBack: useCallback(() => {
      trigger?.('password');
    }, [password]),
  });

  return (
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
      />
    </div>
  );
};
export default PasswordInput;
