import { cn } from '@/util/cn';
import { useFormContext } from 'react-hook-form';
import { CreateMeetingPayload } from 'types/meetingForm';

import { descriptionValidation } from '../validation';

interface DescriptionFieldProps {
  required?: boolean;
}

const DescriptionField = ({ required = true }: DescriptionFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateMeetingPayload>();

  const validation = required
    ? descriptionValidation
    : { ...descriptionValidation, required: false };

  return (
    <div className="space-y-2">
      <label htmlFor="content" className="typo-body1 font-medium text-Cgray700">
        모임 설명
      </label>
      <textarea
        id="content"
        placeholder="모임에 대한 설명을 입력해주세요"
        {...register('content', validation)}
        className={cn(
          'box-border h-32 w-full resize-none rounded-md bg-Cgray200 px-[16px] py-[14px] text-base text-Cgray700 caret-Cgray500 shadow-sm transition-colors placeholder:text-Cgray400 focus:outline-none',
          errors.content && 'border border-warning',
        )}
      />
      {errors.content && (
        <p className="typo-caption1 mt-[10px] px-[10px] text-warning">
          {errors.content.message}
        </p>
      )}
    </div>
  );
};

export default DescriptionField;
