import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ILoginFormData } from 'types/auth';

import { useLoginMutation } from './mutations/useUserMutation';

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
