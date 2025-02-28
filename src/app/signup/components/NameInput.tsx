'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import useDebounce from '@/hooks/useDebounde';
import { nameValidation } from '@/util/validation';
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { IInputProps, ISignupFormData } from 'types/auth';

export interface INameInputProps extends IInputProps<ISignupFormData> {
  isNameCheck: boolean;
  handleNameCheck: () => void;
  setIsNameCheck: Dispatch<SetStateAction<boolean>>;
}

const NameInput = ({
  register,
  errors,
  isNameCheck,
  handleNameCheck,
  setIsNameCheck,
  control,
  trigger,
}: INameInputProps) => {
  const name = useWatch({ control, name: 'name' });

  // 중복확인 로직 수행
  useEffect(() => {
    setIsNameCheck(false);
  }, [name]);

  useDebounce({
    value: name,
    callBack: useCallback(() => {
      trigger?.('name');
    }, [name]),
  });

  return (
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
  );
};
export default NameInput;
