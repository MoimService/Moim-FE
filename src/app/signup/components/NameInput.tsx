import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import useDebounce from '@/hooks/useDebounde';
import { nameValidation } from '@/util/validation';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormTrigger,
  useWatch,
} from 'react-hook-form';

import { ISignupFormData } from '../page';

export interface ISignupInputProps {
  control: Control<ISignupFormData>; // ✅ control 타입 지정
  register: UseFormRegister<ISignupFormData>; // ✅ register 타입 지정
  errors: FieldErrors<ISignupFormData>; // ✅ errors 타입 지정
  trigger?: UseFormTrigger<ISignupFormData>; // ✅ trigger 타입 지정
}

export interface INameInputProps extends ISignupInputProps {
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

  useEffect(() => {
    setIsNameCheck(false);
  }, [name]);
  // 중복확인 로직 수행

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
          //   onFocus={() => setFocusedField('name')}
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
