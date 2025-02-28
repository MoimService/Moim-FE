'use client';

import { Input } from '@/components/ui/Input';
import useDebounce from '@/hooks/useDebounde';
import { ILoginFormData } from '@/hooks/useLoginForm';
import { loginEmailValidation } from '@/util/validation';
import { useCallback } from 'react';
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormTrigger,
  useWatch,
} from 'react-hook-form';

export interface IInputProps {
  control: Control<ILoginFormData>; // ✅ control 타입 지정
  register: UseFormRegister<ILoginFormData>; // ✅ register 타입 지정
  errors: FieldErrors<ILoginFormData>; // ✅ errors 타입 지정
  trigger: UseFormTrigger<ILoginFormData>; // ✅ trigger 타입 지정
}

const EmailInput = ({ control, register, errors, trigger }: IInputProps) => {
  // `useWatch`를 개별 컴포넌트에서 호출하여 최적화
  const email = useWatch({ control, name: 'email' });

  useDebounce({
    value: email,
    callBack: useCallback(() => {
      trigger('email');
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
