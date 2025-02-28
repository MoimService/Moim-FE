import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { useLoginMutation } from './mutations/useUserMutation';

export interface ILoginFormData {
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
    onSubmit,
    control,
    trigger,
  };
};

export default useLoginForm;
