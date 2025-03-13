'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useUpdateContactInfoMutation } from '@/hooks/mutations/useMyPageMutation';
import { useProfileQuery } from '@/hooks/queries/useMyPageQueries';
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full rounded-[16px] border border-Cgray300 p-[32px]"
    >
      <div className="flex flex-col gap-[32px]">
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="phone" className="typo-head3 text-main">
            전화번호
          </label>
          <Input
            id="phone"
            type="text"
            placeholder="010-1234-5678"
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
            placeholder="kakaotalk 아이디"
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
            placeholder="github.com/사용자아이디"
            errorMessage={errors.github?.message}
            {...register('github', {
              pattern: {
                value: /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/,
                message: 'github.com/사용자아이디 형식으로 입력해주세요',
              },
              validate: {
                hasUsername: (value) => {
                  if (!value) return true; // 필수 필드가 아닌 경우

                  // 사용자 이름 추출
                  const usernameMatch = value.match(
                    /github\.com\/([a-zA-Z0-9_-]+)/,
                  );
                  const username = usernameMatch ? usernameMatch[1] : '';

                  return (
                    username.length > 0 ||
                    'github.com/사용자아이디 형식으로 입력해주세요'
                  );
                },
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
            placeholder="blog.naver.com/아이디 또는 velog.io/@아이디"
            errorMessage={errors.blog?.message}
            {...register('blog', {
              pattern: {
                // 다양한 블로그 URL 형식 지원 (네이버, 벨로그, 기타 유효한 URL)
                value:
                  /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\/.+)?$/,
                message: '올바른 블로그 URL을 입력해주세요',
              },
              validate: {
                isValidBlogFormat: (value) => {
                  if (!value) return true; // 필수 필드가 아닌 경우

                  // 네이버 블로그 패턴
                  const naverPattern =
                    /^(https?:\/\/)?(www\.)?blog\.naver\.com\/[a-zA-Z0-9_-]+/;

                  // 벨로그 패턴
                  const velogPattern =
                    /^(https?:\/\/)?(www\.)?velog\.io\/@[a-zA-Z0-9_-]+/;

                  // 일반 URL 패턴
                  const generalUrlPattern =
                    /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\/.+)?$/;

                  // 네이버, 벨로그 또는 일반 URL 패턴 중 하나라도 만족하면 통과
                  const isValid =
                    naverPattern.test(value) ||
                    velogPattern.test(value) ||
                    generalUrlPattern.test(value);

                  return isValid || '유효한 블로그 URL 형식이 아닙니다';
                },
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
