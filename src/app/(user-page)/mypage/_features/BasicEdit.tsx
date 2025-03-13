'use client';

import Dropdown from '@/components/common/Dropdown';
import { Button } from '@/components/ui/Button';
import { useUpdateProfileMutation } from '@/hooks/mutations/useMyPageMutation';
import { useProfileQuery } from '@/hooks/queries/useMyPageQueries';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import {
  AGE_OPTIONS,
  DEFAULT_VALUES,
  GENDER_OPTIONS,
  ICON_SIZES,
  LOCATION_OPTIONS,
  MAX_INTRO_LENGTH,
  POSITION_OPTIONS,
} from '../../../../constants/mypage/mypageConstant';
import { IFormData } from '../../../../types/mypageTypes';

interface BasicEditProps {
  onEditComplete: () => void;
}

const BasicEdit = ({ onEditComplete }: BasicEditProps) => {
  // 드롭다운 디스플레이를 위한 상태 관리
  const [ageLabel, setAgeLabel] = useState('선택 안함');
  const [locationLabel, setLocationLabel] = useState('선택 안함');

  // 소개글 글자 수 상태 관리
  const [introLength, setIntroLength] = useState(0);

  // 커스텀 훅을 사용하여 프로필 데이터 가져오기
  const { data: profileData, isLoading } = useProfileQuery();

  // 프로필 업데이트 뮤테이션 훅 사용
  const { mutate: updateProfile, isPending: isUpdating } =
    useUpdateProfileMutation();

  // React Hook Form 설정
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormData>({
    defaultValues: {
      name: '',
      intro: '',
      position: '',
      gender: '',
      age: '',
      location: '',
    },
  });

  // 현재 폼 값 관찰
  const currentGender = useWatch({
    control,
    name: 'gender',
  });

  // 추가: position 값 관찰
  const currentPosition = useWatch({
    control,
    name: 'position',
  });

  // 소개글 감시하여 글자 수 업데이트
  const introValue = useWatch({
    control,
    name: 'intro',
  });
  useEffect(() => {
    setIntroLength(introValue?.length || 0);
  }, [introValue]);

  // 프로필 데이터로 폼 초기화
  useEffect(() => {
    if (profileData?.data) {
      const profile = profileData.data;

      // 폼 값 설정
      reset({
        name: profile.name || '',
        intro: profile.intro || '',
        position: profile.position || '',
        gender: profile.gender || DEFAULT_VALUES.GENDER,
        age: profile.age || '',
        location: profile.location || '',
      });

      // 소개글 글자 수 초기화
      setIntroLength(profile.intro?.length || 0);

      // 드롭다운 라벨 초기 설정
      const ageOption = AGE_OPTIONS.find((opt) => opt.value === profile.age);
      if (ageOption) setAgeLabel(ageOption.label);

      const locationOption = LOCATION_OPTIONS.find(
        (opt) => opt.value === profile.location,
      );
      if (locationOption) setLocationLabel(locationOption.label);
    }
  }, [profileData, reset]);

  // 폼 제출 처리
  const onSubmit = (data: IFormData) => {
    // 글자 수 검사 추가
    if (data.intro && data.intro.length > MAX_INTRO_LENGTH) {
      return;
    }

    updateProfile(data, {
      onSuccess: () => {
        onEditComplete();
      },
    });
  };

  const handleAgeChange = useCallback(
    (value: string) => {
      setValue('age', value);
      const selectedOption = AGE_OPTIONS.find((opt) => opt.value === value);
      if (selectedOption) setAgeLabel(selectedOption.label);
    },
    [setValue],
  );

  const handleLocationChange = useCallback(
    (value: string) => {
      setValue('location', value);
      const selectedOption = LOCATION_OPTIONS.find(
        (opt) => opt.value === value,
      );
      if (selectedOption) setLocationLabel(selectedOption.label);
    },
    [setValue],
  );

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
      <div className="flex flex-col gap-[16px] md:gap-[32px]">
        {/* 이름 입력 필드 */}
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="name-input" className="typo-head3 text-main">
            사용자 이름
          </label>
          <input
            id="name-input"
            type="text"
            {...register('name', { required: true })}
            className="typo-button1 h-[40px] rounded-[16px] border-b border-Cgray300 bg-Cgray200 px-4 py-2 text-Cgray700 focus:outline-none md:h-[50px]"
          />
          {errors.name && (
            <span className="text-sm text-warning">이름을 입력해주세요</span>
          )}
        </div>

        {/* 자기소개 텍스트 영역 */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label htmlFor="intro-input" className="typo-head3 text-main">
              자기소개
            </label>
          </div>
          <textarea
            id="intro-input"
            {...register('intro', {
              maxLength: {
                value: MAX_INTRO_LENGTH,
                message: `최대 ${MAX_INTRO_LENGTH}자까지 작성 가능합니다`,
              },
            })}
            rows={3}
            className="h-[140px] resize-none rounded-[16px] border-b border-Cgray300 bg-Cgray200 px-4 py-2 text-Cgray700 focus:outline-none"
          />
          {errors.intro && (
            <span className="text-sm text-warning">{errors.intro.message}</span>
          )}
          {introLength > MAX_INTRO_LENGTH && !errors.intro && (
            <span className="text-sm text-warning">
              최대 {MAX_INTRO_LENGTH}자까지 작성 가능합니다
            </span>
          )}
        </div>

        {/* 포지션 버튼 */}
        <div className="flex flex-col gap-[16px] border-b border-Cgray300 pb-[16px] md:pb-[32px]">
          <div className="typo-head3 text-main">포지션</div>
          <div className="flex w-full flex-wrap gap-2">
            <div className="rounded-4 typo-head3 flex w-full gap-[12px]">
              {POSITION_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`flex flex-1 flex-col items-center justify-center gap-1 rounded-md py-1 transition-colors duration-300 md:py-2 ${
                    currentPosition === option.value
                      ? 'bg-default text-main'
                      : 'bg-disable text-Cgray500'
                  }`}
                  onClick={() => setValue('position', option.value)}
                  aria-label={option.value}
                >
                  {option.icon({
                    size: ICON_SIZES.MOBILE,
                    className: 'md:hidden',
                  })}
                  {option.icon({
                    size: ICON_SIZES.DESKTOP,
                    className: 'hidden md:block',
                  })}
                  <span className="text-sm md:text-[17px]">{option.value}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 성별 토글 버튼 */}
        <div className="flex flex-col gap-[16px] border-b border-Cgray300 pb-[16px] md:pb-[32px]">
          <div className="typo-head3 text-main">성별</div>
          <div className="typo-head3 flex w-full gap-[16px] rounded-md">
            {GENDER_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`flex flex-1 flex-col items-center justify-center gap-1 rounded-md py-1 transition-colors duration-300 md:py-2 ${
                  currentGender === option.value
                    ? 'bg-default text-main'
                    : 'bg-disable text-Cgray500'
                }`}
                onClick={() => setValue('gender', option.value)}
                aria-label={option.value}
              >
                {option.icon({
                  size: ICON_SIZES.MOBILE,
                  className: 'md:hidden',
                })}
                {option.icon({
                  size: ICON_SIZES.DESKTOP,
                  className: 'hidden md:block',
                })}
                <span className="text-sm md:text-[17px]">{option.value}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 연령대 드롭다운 */}
        <div className="flex flex-col gap-[16px] border-b border-Cgray300 pb-[16px] md:pb-[32px]">
          <div className="typo-head3 text-main">연령대</div>
          <Controller
            name="age"
            control={control}
            render={() => (
              <Dropdown
                aria-label="연령대"
                options={AGE_OPTIONS}
                onChange={handleAgeChange}
                trigger={ageLabel}
                variant="icon"
                className="w-full md:h-[50px]"
                sideOffset={6}
              />
            )}
          />
        </div>

        {/* 지역 드롭다운 */}
        <div className="flex flex-col gap-[16px] border-b border-Cgray300 pb-[16px] md:pb-[32px]">
          <div className="typo-head3 text-main">지역</div>
          <Controller
            name="location"
            control={control}
            render={() => (
              <Dropdown
                aria-label="지역"
                options={LOCATION_OPTIONS}
                onChange={handleLocationChange}
                trigger={locationLabel}
                variant="icon"
                className="w-full md:h-[50px]"
                sideOffset={6}
                contentClassName="max-h-[200px] overflow-y-auto"
              />
            )}
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
            disabled={
              isSubmitting || isUpdating || introLength > MAX_INTRO_LENGTH
            }
          >
            {isUpdating ? '저장 중...' : '변경사항 저장'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BasicEdit;
