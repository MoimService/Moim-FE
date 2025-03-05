import { Input } from '@/components/ui/Input';
import { useFormContext } from 'react-hook-form';
import { CreateMeetingPayload } from 'types/meetingForm';

import { meetingTitleValidation } from '../validation';

interface MeetingTitleFieldProps {
  required?: boolean;
}

const TitleField = ({ required = true }: MeetingTitleFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateMeetingPayload>();

  const validation = required
    ? meetingTitleValidation
    : { ...meetingTitleValidation, required: false };

  return (
    <div className="space-y-2">
      <label
        htmlFor="meetingTitle"
        className="typo-body1 font-medium text-Cgray700"
      >
        모임 이름
      </label>
      <Input
        id="meetingTitle"
        placeholder="모임 이름을 입력해주세요"
        {...register('meetingTitle', validation)}
        errorMessage={errors.meetingTitle?.message}
      />
    </div>
  );
};

export default TitleField;
