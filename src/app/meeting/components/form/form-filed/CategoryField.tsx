import { MEETING_TYPES } from '@/app/meeting/constants/meeting-form/meetingConstants';
import { cn } from '@/util/cn';
import { Check } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { CreateMeetingPayload } from 'types/meetingForm';

import { meetingTypeValidation } from '../validation';

interface CategoryFieldProps {
  required?: boolean;
}

const CategoryField = ({ required = true }: CategoryFieldProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateMeetingPayload>();

  const validation = required
    ? meetingTypeValidation
    : { ...meetingTypeValidation, required: false };

  return (
    <div className="space-y-2">
      <label
        htmlFor="meeting-type-group"
        className="typo-body1 font-medium text-Cgray700"
      >
        모임 유형
      </label>
      <Controller
        name="categoryTitle"
        control={control}
        rules={validation}
        render={({ field }) => (
          <div>
            <div
              className="grid grid-cols-2 gap-3"
              id="meeting-type-group"
              role="radiogroup"
            >
              {MEETING_TYPES.map((type) => (
                <div
                  key={type.id}
                  className={cn(
                    'flex cursor-pointer items-center gap-2 rounded-md border p-3 transition-all',
                    field.value === type.label
                      ? 'border-main bg-default text-main'
                      : 'border-Cgray300 text-Cgray500',
                  )}
                  onClick={() => field.onChange(type.label)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      field.onChange(type.label);
                    }
                  }}
                  tabIndex={0}
                  role="radio"
                  aria-checked={field.value === type.label}
                >
                  <div className="flex flex-1 items-center gap-2">
                    {type.icon}
                    <span className="typo-body1">{type.label}</span>
                  </div>
                  {field.value === type.label && (
                    <Check className="ml-auto h-5 w-5 text-main" />
                  )}
                </div>
              ))}
            </div>
            {errors.categoryTitle && (
              <p className="typo-caption1 mt-[10px] px-[10px] text-warning">
                {errors.categoryTitle.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default CategoryField;
