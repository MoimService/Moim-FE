import { Input } from '@/components/ui/Input';
import { useFormContext } from 'react-hook-form';
import { CreateMeetingPayload } from 'types/meetingForm';

import { locationValidation } from '../validation';

interface LocationFieldProps {
  required?: boolean;
}

const LocationField = ({ required = true }: LocationFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateMeetingPayload>();

  const validation = required
    ? locationValidation
    : { ...locationValidation, required: false };

  return (
    <div className="space-y-2">
      <label
        htmlFor="location"
        className="typo-body1 font-medium text-Cgray700"
      >
        모임 장소
      </label>
      <Input
        id="location"
        placeholder="모임 장소를 입력해주세요"
        {...register('location', validation)}
        errorMessage={errors.location?.message}
      />
    </div>
  );
};

export default LocationField;
