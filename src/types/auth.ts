import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormTrigger,
} from 'react-hook-form';

interface ISignupFormData {
  name: string;
  email: string;
  position: string;
  password: string;
  passwordCheck: string;
}

interface ILoginFormData {
  email: string;
  password: string;
}

interface IInputProps<T extends FieldValues> {
  control: Control<T>; // ✅ control 타입 지정
  register: UseFormRegister<T>; // ✅ register 타입 지정
  errors: FieldErrors<T>; // ✅ errors 타입 지정
  trigger?: UseFormTrigger<T>; // ✅ trigger 타입 지정
}

export type { ISignupFormData, ILoginFormData, IInputProps };
