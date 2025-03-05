import { Button } from '@/components/ui/Button';
import { validateImageSize, validateImageType } from '@/util/base64';
import { IMAGE_CONFIG } from 'constants/meeting-form/meetingConstants';
import { Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { CreateMeetingPayload } from 'types/meetingForm';

import { imageValidationMessages } from '../validation';

interface ImageFieldProps {
  required?: boolean;
  maxSizeMB?: number;
}

const ImageField = ({ required = true, maxSizeMB = 5 }: ImageFieldProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  const {
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitted },
    getValues,
    watch,
  } = useFormContext<CreateMeetingPayload>();

  const imageName = watch('imageName');

  // 컴포넌트 초기 렌더링 시 기존 이미지가 있으면 미리보기 설정
  useEffect(() => {
    const existingImageName = getValues('imageName');
    const imageBase64 = getValues('imageEncodedBase64');

    if (existingImageName && imageBase64) {
      setImagePreview(`data:image/jpeg;base64,${imageBase64}`);
    }
  }, [getValues]);

  // 사용자가 상호작용한 경우에만 에러 메시지 표시
  useEffect(() => {
    if (isSubmitted || showError) {
      if (required && !imageName) {
        setError('imageName', {
          type: 'manual',
          message: imageValidationMessages.required,
        });
      } else {
        clearErrors('imageName');
      }
    }
  }, [imageName, isSubmitted, required, setError, clearErrors, showError]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      if (!validateImageType(file)) {
        setError('imageName', {
          type: 'manual',
          message: imageValidationMessages.formatError,
        });
        setShowError(true);
        return;
      }

      if (!validateImageSize(file, maxSizeMB)) {
        setError('imageName', {
          type: 'manual',
          message: imageValidationMessages.sizeError(maxSizeMB),
        });
        setShowError(true);
        return;
      }

      setValue('imageName', file.name);
      clearErrors('imageName');
      clearErrors('imageEncodedBase64');
      setShowError(false);

      // 이미지 미리보기 생성
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setImagePreview(null);
    setValue('imageName', '');
    setValue('imageEncodedBase64', '');
    setShowError(true);

    if (required) {
      setError('imageName', {
        type: 'manual',
        message: imageValidationMessages.required,
      });
    }
  };

  // 필요한 경우에만 오류 메시지 표시
  const shouldShowError = (isSubmitted || showError) && errors.imageName;

  return (
    <div className="space-y-2">
      <label htmlFor="image" className="typo-body1 font-medium text-Cgray700">
        대표 이미지
      </label>
      <div className="flex flex-col items-center justify-center rounded-md border-2 border-dashed border-Cgray300 p-6">
        <input
          type="file"
          id="image"
          accept={IMAGE_CONFIG.ACCEPTED_FORMATS.join(',')}
          className="hidden"
          onChange={handleImageChange}
        />

        {imagePreview ? (
          <div className="relative h-64 w-full">
            <Image
              src={imagePreview}
              alt="모임 이미지 미리보기"
              fill
              className="rounded-md object-cover"
            />
            <Button
              type="button"
              variant="default"
              size="sm"
              className="absolute bottom-4 right-4"
              onClick={handleDeleteImage}
            >
              이미지 삭제
            </Button>
          </div>
        ) : (
          <label
            htmlFor="image"
            className="flex cursor-pointer flex-col items-center"
          >
            <div className="mb-2 rounded-full bg-Cgray200 p-3">
              <ImageIcon className="size-6 text-Cgray500" />
            </div>
            <p className="typo-body1 text-Cgray500">클릭하여 이미지 업로드</p>
            <p className="typo-caption1 mt-1 text-Cgray400">
              JPG, PNG, JPEG 파일
            </p>
          </label>
        )}

        {shouldShowError && (
          <p className="typo-caption1 mt-[10px] px-[10px] text-center text-warning">
            {errors.imageName?.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ImageField;
