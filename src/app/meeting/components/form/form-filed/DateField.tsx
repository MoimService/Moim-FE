import { DatePicker } from '@/components/ui/form/DatePicker';
import { useFormContext } from 'react-hook-form';
import { CreateMeetingPayload } from 'types/meetingForm';

import { startDateValidation } from '../validation';

interface DateFieldProps {
  required?: boolean;
}

const DateField = ({ required = true }: DateFieldProps) => {
  const {
    formState: { errors },
  } = useFormContext<CreateMeetingPayload>();

  const validation = required
    ? startDateValidation
    : { ...startDateValidation, required: false };

  return (
    <DatePicker
      id="startDate"
      name="startDate"
      label="시작 날짜"
      placeholder="시작 날짜를 선택해주세요"
      errorMessage={errors.startDate?.message as string}
      required={required}
      validationRules={validation}
    />
  );
};

export default DateField;
