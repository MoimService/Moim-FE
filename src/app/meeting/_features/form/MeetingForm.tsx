'use client';

import {
  CategoryField,
  DateField,
  DescriptionField,
  ImageField,
  InfoMessage,
  LocationField,
  MemberLimitField,
  PrivacyField,
  RequireApprovalField,
  SubmitButton,
  TechStackField,
  TitleField,
} from '@/app/meeting/_features/form/form-filed';
import { useToast } from '@/components/common/ToastContext';
import useMeetingFormMutation from '@/hooks/mutations/useMeetingFormMutation';
import { convertImageToBase64 } from '@/util/base64';
import { MEETING_TYPES } from 'constants/category/category';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { CreateMeetingPayload } from 'types/meetingForm';

interface MeetingFormProps {
  mode: 'create' | 'edit';
  initialData?: Partial<CreateMeetingPayload>;
  meetingId?: string;
}

export default function MeetingForm({
  mode,
  initialData = {},
  meetingId,
}: MeetingFormProps) {
  const router = useRouter();
  const { showToast } = useToast();

  // 날짜 YYYY-MM-DD 형식으로 변환
  const today = new Date();
  const formattedToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  // 카테고리 라벨에서 ID 찾기 (URL 용)
  const getCategoryId = (label: string) => {
    const category = MEETING_TYPES.find((type) => type.label === label);
    return category ? category.id : '';
  };

  const { createMeeting, isLoading } = useMeetingFormMutation({
    onSuccessCallback: (response, formData) => {
      if (mode === 'create') {
        showToast('모임이 성공적으로 생성되었습니다', 'success', {
          duration: 3000,
        });
        const categoryId = getCategoryId(formData.categoryTitle);
        router.push(`/meeting/${categoryId}/${response.data.meetingId}`);
      } else if (mode === 'edit') {
        showToast('모임이 성공적으로 수정되었습니다', 'success');
        const categoryId = getCategoryId(formData.categoryTitle);
        router.push(`/meeting/${categoryId}/${meetingId}`);
      }
    },
    onErrorCallback: () => {
      // 실패 시 토스트 표시
      showToast('모임 생성에 실패했습니다', 'error', {
        duration: 3000,
      });
    },
  });

  const defaultValues: CreateMeetingPayload = {
    meetingTitle: '',
    categoryTitle: '',
    imageName: '',
    imageEncodedBase64: '',
    content: '',
    location: '',
    maxMember: 0,
    startDate: formattedToday,
    isPublic: true,
    requireApproval: false,
    skillArray: [],
    ...initialData,
  };

  const methods = useForm<CreateMeetingPayload>({
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (formData: CreateMeetingPayload) => {
    try {
      // 이미지 처리
      const fileInput = document.getElementById('image') as HTMLInputElement;
      if (fileInput?.files && fileInput.files.length > 0) {
        const imageData = await convertImageToBase64(fileInput.files[0]);
        formData.imageName = imageData.name;
        formData.imageEncodedBase64 = imageData.base64;
      }

      if (mode === 'create') {
        await createMeeting.mutateAsync(formData);
      } else if (mode === 'edit' && meetingId) {
        // 모임 수정 (TODO: API 구현 시 수정)
        // await updateMeeting.mutateAsync({ id: meetingId, data: formData });
        // API가 구현되지 않았으므로 수정 성공으로 처리
      }
    } catch (error) {}
  };

  return (
    <FormProvider {...methods}>
      <div className="mx-auto w-full max-w-3xl p-6">
        <h1 className="typo-heading1 mb-8 text-center">
          {mode === 'create' ? '모임 생성하기' : '모임 수정하기'}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <TitleField required />
          <CategoryField required />
          <LocationField required />
          <DateField required />
          <MemberLimitField required />
          <TechStackField maxSelections={5} />
          <ImageField required={true} />
          <DescriptionField required />
          <RequireApprovalField />
          <PrivacyField />
          <InfoMessage />
          <SubmitButton
            text={mode === 'create' ? '모임 생성하기' : '모임 수정하기'}
            isLoading={isLoading}
          />
        </form>
      </div>
    </FormProvider>
  );
}
