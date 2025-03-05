'use client';

import Dropdown from '@/components/common/Dropdown';
import { Button } from '@/components/ui/Button';
import {
  useProfileQuery,
  useUpdateProfileMutation,
} from '@/hooks/queries/useMyPageQueries';
import { Code, Compass, Mars, Paintbrush, Venus, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import { IFormData, IIconProps } from '../../../../types/mypageTypes';

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

  const ageOptions = useMemo(
    () => [
      { value: '10대', label: '10대' },
      { value: '20대', label: '20대' },
      { value: '30대', label: '30대' },
      { value: '40대', label: '40대' },
      { value: '50대이상', label: '50대이상' },
      { value: '선택 안함', label: '선택 안함' },
    ],
    [],
  );

  const locationOptions = useMemo(
    () => [
      { value: '서울', label: '서울' },
      { value: '경기', label: '경기' },
      { value: '인천', label: '인천' },
      { value: '부산', label: '부산' },
      { value: '대구', label: '대구' },
      { value: '광주', label: '광주' },
      { value: '대전', label: '대전' },
      { value: '울산', label: '울산' },
      { value: '세종', label: '세종' },
      { value: '강원', label: '강원' },
      { value: '충북', label: '충북' },
      { value: '충남', label: '충남' },
      { value: '전북', label: '전북' },
      { value: '전남', label: '전남' },
      { value: '경북', label: '경북' },
      { value: '경남', label: '경남' },
      { value: '제주', label: '제주' },
      { value: '선택 안함', label: '선택 안함' },
    ],
    [],
  );

  // 프로필 데이터로 폼 초기화
  useEffect(() => {
    if (profileData?.data) {
      const profile = profileData.data;

      // 폼 값 설정
      reset({
        name: profile.name || '',
        intro: profile.intro || '',
        position: profile.position || '',
        gender: profile.gender || '비공개',
        age: profile.age || '',
        location: profile.location || '',
      });

      // 소개글 글자 수 초기화
      setIntroLength(profile.intro?.length || 0);

      // 드롭다운 라벨 초기 설정
      const ageOption = ageOptions.find((opt) => opt.value === profile.age);
      if (ageOption) setAgeLabel(ageOption.label);

      const locationOption = locationOptions.find(
        (opt) => opt.value === profile.location,
      );
      if (locationOption) setLocationLabel(locationOption.label);
    }
  }, [profileData, reset, ageOptions, locationOptions]);

  // 폼 제출 처리
  const onSubmit = (data: IFormData) => {
    // 글자 수 검사 추가
    if (data.intro && data.intro.length > 250) {
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
      const selectedOption = ageOptions.find((opt) => opt.value === value);
      if (selectedOption) setAgeLabel(selectedOption.label);
    },
    [setValue, ageOptions],
  );

  const handleLocationChange = useCallback(
    (value: string) => {
      setValue('location', value);
      const selectedOption = locationOptions.find((opt) => opt.value === value);
      if (selectedOption) setLocationLabel(selectedOption.label);
    },
    [setValue, locationOptions],
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
                value: 250,
                message: '최대 250자까지 작성 가능합니다',
              },
            })}
            rows={3}
            className="h-[140px] resize-none rounded-[16px] border-b border-Cgray300 bg-Cgray200 px-4 py-2 text-Cgray700 focus:outline-none"
          />
          {errors.intro && (
            <span className="text-sm text-warning">{errors.intro.message}</span>
          )}
          {introLength > 250 && !errors.intro && (
            <span className="text-sm text-warning">
              최대 250자까지 작성 가능합니다
            </span>
          )}
        </div>

        {/* 포지션 버튼 */}
        <div className="flex flex-col gap-[16px] border-b border-Cgray300 pb-[16px] md:pb-[32px]">
          <div className="typo-head3 text-main">포지션</div>
          <div className="flex w-full flex-wrap gap-2">
            <div className="rounded-4 typo-head3 flex w-full gap-[12px]">
              {[
                {
                  value: '프론트엔드',
                  label: '프론트엔드',
                  icon: (props: IIconProps) => <Code {...props} />,
                },
                {
                  value: '백엔드',
                  label: '백엔드',
                  icon: (props: IIconProps) => <Compass {...props} />,
                },
                {
                  value: '디자이너',
                  label: '디자이너',
                  icon: (props: IIconProps) => <Paintbrush {...props} />,
                },
                {
                  value: '선택 안함',
                  label: '선택 안함',
                  icon: (props: IIconProps) => <X {...props} />,
                },
              ].map((option) => (
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
                  {option.icon({ size: 18, className: 'md:hidden' })}
                  {option.icon({ size: 25, className: 'hidden md:block' })}
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
            {[
              {
                value: '남자',
                icon: (props: IIconProps) => <Mars {...props} />,
              },
              {
                value: '여자',
                icon: (props: IIconProps) => <Venus {...props} />,
              },
              {
                value: '비공개',
                icon: (props: IIconProps) => <X {...props} />,
              },
            ].map((option) => (
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
                {option.icon({ size: 18, className: 'md:hidden' })}
                {option.icon({ size: 25, className: 'hidden md:block' })}
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
                options={ageOptions}
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
                options={locationOptions}
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
            disabled={isSubmitting || isUpdating || introLength > 250}
          >
            {isUpdating ? '저장 중...' : '변경사항 저장'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BasicEdit;
