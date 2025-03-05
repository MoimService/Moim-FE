import { cn } from '@/util/cn';
import { PRIVACY_OPTIONS } from 'constants/meeting-form/meetingConstants';
import { Check } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { CreateMeetingPayload } from 'types/meetingForm';

const PrivacyField = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateMeetingPayload>();

  return (
    <div className="space-y-2 text-white">
      <label
        htmlFor="privacy-group"
        className="typo-body1 font-medium text-Cgray700"
      >
        모임 공개 여부
      </label>
      <Controller
        name="isPublic"
        control={control}
        render={({ field }) => (
          <div className="flex gap-4" id="privacy-group" role="radiogroup">
            {PRIVACY_OPTIONS.map((option) => (
              <div
                key={option.id}
                className={cn(
                  'flex-1 cursor-pointer rounded-md border p-4 transition-all',
                  (option.id === 'public' && field.value) ||
                    (option.id === 'private' && !field.value)
                    ? 'border-main bg-main text-white'
                    : 'border-Cgray300',
                )}
                onClick={() => field.onChange(option.id === 'public')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    field.onChange(option.id === 'public');
                  }
                }}
                tabIndex={0}
                role="radio"
                aria-checked={
                  (option.id === 'public' && field.value) ||
                  (option.id === 'private' && !field.value)
                }
              >
                <div className="flex items-center justify-between">
                  <span className="typo-body1">{option.label}</span>
                  {((option.id === 'public' && field.value) ||
                    (option.id === 'private' && !field.value)) && (
                    <Check className="h-5 w-5 text-white" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      />
      {errors.isPublic && (
        <p className="typo-caption1 mt-[10px] px-[10px] text-warning">
          {errors.isPublic.message}
        </p>
      )}
    </div>
  );
};

export default PrivacyField;
