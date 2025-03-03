import { JOIN_METHODS } from '@/app/meeting/constants/meeting-form/meetingConstants';
import { cn } from '@/util/cn';
import { Check } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { CreateMeetingPayload } from 'types/meetingForm';

const RequireApprovalField = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateMeetingPayload>();

  return (
    <div className="space-y-2 text-white">
      <label
        htmlFor="join-method-group"
        className="typo-body1 font-medium text-Cgray700"
      >
        가입 방식
      </label>
      <Controller
        name="requireApproval"
        control={control}
        render={({ field }) => (
          <div className="flex gap-4" id="join-method-group" role="radiogroup">
            {JOIN_METHODS.map((method) => (
              <div
                key={method.id}
                className={cn(
                  'flex-1 cursor-pointer rounded-md border p-4 transition-all',
                  (method.id === 'approval' && field.value) ||
                    (method.id === 'immediate' && !field.value)
                    ? 'border-main bg-main text-white'
                    : 'border-Cgray300',
                )}
                onClick={() => field.onChange(method.id === 'approval')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    field.onChange(method.id === 'approval');
                  }
                }}
                tabIndex={0}
                role="radio"
                aria-checked={
                  (method.id === 'approval' && field.value) ||
                  (method.id === 'immediate' && !field.value)
                }
              >
                <div className="flex items-center justify-between">
                  <span className="typo-body1">{method.label}</span>
                  {((method.id === 'approval' && field.value) ||
                    (method.id === 'immediate' && !field.value)) && (
                    <Check className="h-5 w-5 text-white" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      />
      {errors.requireApproval && (
        <p className="typo-caption1 mt-[10px] px-[10px] text-warning">
          {errors.requireApproval.message}
        </p>
      )}
    </div>
  );
};

export default RequireApprovalField;
