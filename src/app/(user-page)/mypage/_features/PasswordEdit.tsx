'use client';

import { useToast } from '@/components/common/ToastContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useUpdatePasswordMutation } from '@/hooks/queries/useMyPageQueries';
import { useForm } from 'react-hook-form';

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  passwordCheck: string;
}

interface PasswordEditProps {
  onEditComplete: () => void;
}

const PasswordEdit = ({ onEditComplete }: PasswordEditProps) => {
  // Toast 컨텍스트 사용
  const { showToast } = useToast();

  // React Hook Form 설정
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFormData>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      passwordCheck: '',
    },
  });

  // 현재 새 비밀번호 값 감시
  const newPassword = watch('newPassword');

  // 비밀번호 업데이트 뮤테이션 커스텀 훅 사용
  const { mutate: updatePassword, isPending: isUpdating } =
    useUpdatePasswordMutation();

  // 폼 제출 처리
  const onSubmit = (data: PasswordFormData) => {
    // 비밀번호 일치 여부 확인
    if (data.newPassword !== data.passwordCheck) {
      setError('passwordCheck', {
        type: 'manual',
        message: '비밀번호가 일치하지 않습니다',
      });
      return;
    }

    // 비밀번호 업데이트 뮤테이션 호출
    updatePassword(
      {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        passwordCheck: data.passwordCheck,
      },
      {
        onSuccess: () => {
          // 성공 시 토스트 메시지 표시
          showToast('비밀번호가 성공적으로 변경되었습니다.', 'success', {
            duration: 3000,
          });
          // 편집 모드 종료
          onEditComplete();
        },
        onError: () => {
          // 모든 서버 에러를 기존 비밀번호 필드 에러로 설정
          setError('currentPassword', {
            type: 'manual',
            message: '기존 비밀번호와 다릅니다',
          });
        },
      },
    );
  };

  // 취소 핸들러
  const handleCancel = () => {
    onEditComplete();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full rounded-[16px] border border-Cgray300 p-[32px]"
    >
      <div className="flex flex-col gap-[32px]">
        <div className="flex w-full flex-col gap-[8px]">
          <label htmlFor="currentPassword" className="typo-head3 text-main">
            기존 비밀번호
          </label>
          <Input
            id="currentPassword"
            type="password"
            errorMessage={errors.currentPassword?.message}
            {...register('currentPassword', {
              required: '기존 비밀번호를 입력해주세요',
            })}
          />
        </div>

        <div className="flex w-full flex-col gap-[8px]">
          <label htmlFor="newPassword" className="typo-head3 text-main">
            새 비밀번호
          </label>
          <Input
            id="newPassword"
            type="password"
            errorMessage={errors.newPassword?.message}
            {...register('newPassword', {
              required: '새 비밀번호를 입력해주세요',
              minLength: {
                value: 8,
                message: '비밀번호는 8자 이상이어야 합니다',
              },
            })}
          />
        </div>

        <div className="flex w-full flex-col gap-[8px]">
          <label htmlFor="passwordCheck" className="typo-head3 text-main">
            비밀번호 확인
          </label>
          <Input
            id="passwordCheck"
            type="password"
            errorMessage={errors.passwordCheck?.message}
            {...register('passwordCheck', {
              required: '비밀번호 확인을 입력해주세요',
              validate: (value) =>
                value === newPassword || '비밀번호가 일치하지 않습니다',
            })}
          />
        </div>

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            className="h-[40px] w-[140px] md:h-[46px]"
            onClick={handleCancel}
          >
            취소
          </Button>
          <Button
            type="submit"
            className="h-[40px] w-[140px] select-none md:h-[46px]"
            disabled={isSubmitting || isUpdating}
          >
            {isUpdating ? '변경 중...' : '비밀번호 변경'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PasswordEdit;
