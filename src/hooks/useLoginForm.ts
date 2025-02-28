import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { useLoginMutation } from './mutations/useUserMutation';
import useDebounce from './useDebounde';

interface ILoginFormData {
  email: string;
  password: string;
}

const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm<ILoginFormData>({
    mode: 'onBlur',
  });

  const router = useRouter();
  const [focusedField, setFocusedField] = useState<'email' | 'password' | null>(
    null,
  );

  // `useWatch`를 사용하여 특정 필드만 감시 (렌더링 최소화)
  const email = useWatch({ control, name: 'email' });
  const password = useWatch({ control, name: 'password' });

  // 입력창 포커스 1초 뒤 유효성 검사
  useDebounce({
    value: email,
    callBack: useCallback(() => {
      if (focusedField === 'email') {
        trigger(focusedField);
      }
    }, [focusedField, trigger]),
  });

  // 비밀번호 포커스 1초 뒤 유효성 검사
  useDebounce({
    value: password,
    callBack: useCallback(() => {
      if (focusedField === 'password') {
        trigger(focusedField);
      }
    }, [focusedField, trigger]),
  });

  const { mutate } = useLoginMutation({
    onSuccessCallback: () => router.push('/'),
  });

  const onSubmit = async (data: ILoginFormData) => {
    mutate(data);
  };

  return {
    register,
    handleSubmit,
    errors,
    setFocusedField,
    onSubmit,
  };
};

export default useLoginForm;
