import TechSelector from '@/components/ui/tech-stack/TechSelector';
import { Controller, useFormContext } from 'react-hook-form';
import { CreateMeetingPayload } from 'types/meetingForm';

import { TECH_STACK_CONFIG, techStackValidation } from '../validation';

interface TechStackFieldProps {
  required?: boolean;
  maxSelections?: number;
}

const TechStackField = ({
  required = false,
  maxSelections = TECH_STACK_CONFIG.MAX_SELECTIONS,
}: TechStackFieldProps) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<CreateMeetingPayload>();

  const handleTechStackChange = (selection: string[]) => {
    setValue('skillArray', selection);
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor="skillArray"
        className="typo-body1 font-medium text-Cgray700"
      >
        사용 기술
        {required && <span className="ml-1 text-warning">*</span>}
      </label>
      <Controller
        name="skillArray"
        control={control}
        rules={required ? { required: techStackValidation.required } : {}}
        render={({ field }) => (
          <TechSelector
            id="skillArray"
            maxSelections={maxSelections}
            onSelectionChange={(selection) => {
              field.onChange(selection);
              handleTechStackChange(selection);
            }}
          />
        )}
      />
      {errors.skillArray && (
        <p className="typo-caption1 mt-[10px] px-[10px] text-warning">
          {errors.skillArray.message}
        </p>
      )}
      <p className="typo-caption1 text-Cgray500">
        * 최대 {maxSelections}개 기술까지 선택 가능합니다.
      </p>
    </div>
  );
};

export default TechStackField;
