import { Input } from '@/components/ui/Input';
import { Users } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { CreateMeetingPayload } from 'types/meetingForm';

import { memberLimitValidation } from '../validation';

interface MemberLimitFieldProps {
  required?: boolean;
}

const MemberLimitField = ({ required = true }: MemberLimitFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateMeetingPayload>();

  const validation = required
    ? memberLimitValidation
    : { ...memberLimitValidation, required: false };

  return (
    <div className="space-y-2">
      <label
        htmlFor="maxMember"
        className="typo-body1 font-medium text-Cgray700"
      >
        모임 정원
      </label>
      <div className="relative">
        <Input
          id="maxMember"
          type="number"
          placeholder="모임 정원을 입력해주세요"
          min={memberLimitValidation.min.value}
          max={memberLimitValidation.max.value}
          pattern="[0-9]*"
          inputMode="numeric"
          onKeyDown={(e) => {
            const allowedKeys = [
              'Backspace',
              'Tab',
              'Enter',
              'ArrowLeft',
              'ArrowRight',
              'ArrowUp',
              'ArrowDown',
            ];
            const isNumber = /^[0-9]$/.test(e.key);

            if (!isNumber && !allowedKeys.includes(e.key)) {
              e.preventDefault();
            }
          }}
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            target.value = target.value.replace(/[^0-9]/g, '');
          }}
          {...register('maxMember', validation)}
          errorMessage={errors.maxMember?.message}
        />
        <Users className="absolute right-[16px] top-1/2 size-5 -translate-y-1/2 text-Cgray500" />
      </div>
    </div>
  );
};

export default MemberLimitField;
