'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  useProfileQuery,
  useUpdateContactInfoMutation,
} from '@/hooks/queries/useMyPageQueries';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { IContactInfoUpdateRequest } from '../../../../types/mypageTypes';

interface ContactEditProps {
  onEditComplete: () => void;
}

const ContactEdit = ({ onEditComplete }: ContactEditProps) => {
  // React Hook Form 설정
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IContactInfoUpdateRequest>({
    defaultValues: {
      phone: '',
      kakao: '',
      github: '',
      blog: '',
    },
  });

  // 프로필 데이터 가져오기 커스텀 훅 사용
  const { data: profileData, isLoading } = useProfileQuery();

  // 연락처 정보 업데이트 커스텀 훅 사용
  const {
    mutate: updateContact,
    isPending: isUpdating,
    isError,
  } = useUpdateContactInfoMutation();

  // 프로필 데이터로 폼 초기화
  useEffect(() => {
    if (profileData?.data?.contactResponse) {
      const contactData = profileData.data.contactResponse;

      // 폼 값 설정
      reset({
        phone: contactData.phone || '',
        kakao: contactData.kakao || '',
        github: contactData.github || '',
        blog: contactData.blog || '',
      });
    }
  }, [profileData, reset]);

  // 폼 제출 처리
  const onSubmit = (data: IContactInfoUpdateRequest) => {
    updateContact(data, {
      onSuccess: () => {
        onEditComplete();
      },
    });
  };

  // 취소 핸들러
  const handleCancel = () => {
    onEditComplete();
  };

  // 로딩 중이면 로딩 표시
  if (isLoading) {
    return <div className="p-4 text-center">데이터를 불러오는 중...</div>;
  }

  // URL 유효성 검사를 위한 정규식
  const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-6 w-full rounded-[16px] border border-Cgray300 p-[32px]"
    >
      <div className="flex flex-col gap-[32px]">
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="phone" className="typo-head3 text-main">
            전화번호
          </label>
          <Input
            id="phone"
            type="text"
            errorMessage={errors.phone?.message}
            {...register('phone', {
              pattern: {
                value: /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/,
                message:
                  '올바른 전화번호 형식을 입력해주세요. (예: 010-1234-5678)',
              },
            })}
          />
        </div>

        <div className="flex flex-col gap-[8px]">
          <label htmlFor="kakao" className="typo-head3 text-main">
            카카오톡 ID
          </label>
          <Input
            id="kakao"
            type="text"
            errorMessage={errors.kakao?.message}
            {...register('kakao', {
              minLength: {
                value: 2,
                message: '카카오톡 ID는 최소 2자 이상이어야 합니다',
              },
            })}
          />
        </div>

        <div className="flex flex-col gap-[8px]">
          <label htmlFor="github" className="typo-head3 text-main">
            깃허브
          </label>
          <Input
            id="github"
            type="text"
            errorMessage={errors.github?.message}
            {...register('github', {
              pattern: {
                value: urlPattern,
                message: '올바른 URL 형식을 입력해주세요',
              },
              validate: {
                isGithub: (value) =>
                  !value ||
                  value.includes('github.com') ||
                  'GitHub URL을 입력해주세요',
              },
            })}
          />
        </div>

        <div className="flex flex-col gap-[8px]">
          <label htmlFor="blog" className="typo-head3 text-main">
            블로그
          </label>
          <Input
            id="blog"
            type="text"
            errorMessage={errors.blog?.message}
            {...register('blog', {
              pattern: {
                value: urlPattern,
                message: '올바른 URL 형식을 입력해주세요',
              },
            })}
          />
        </div>

        {isError && (
          <div className="text-red-500 text-sm">
            연락처 정보를 업데이트하는 중 오류가 발생했습니다.
          </div>
        )}

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
            {isUpdating ? '저장 중...' : '변경사항 저장'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ContactEdit;
