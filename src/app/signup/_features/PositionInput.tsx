import { PositionSelect } from '@/components/common/PositionSelect';
import { positionValidation } from '@/util/validation';
import { useWatch } from 'react-hook-form';
import { IInputProps, ISignupFormData } from 'types/auth';

interface IPositionInputProps extends IInputProps<ISignupFormData> {
  handleClickPosition: (value: string) => void;
}

const PositionInput = ({
  control,
  handleClickPosition,
  errors,
  register,
}: IPositionInputProps) => {
  const position = useWatch({ control, name: 'position' });
  return (
    <div className="flex flex-col gap-[8px]">
      <label htmlFor="id" className="typo-head3 text-Cgray700">
        포지션
      </label>
      <PositionSelect position={position} setPosition={handleClickPosition} />
      {errors.position?.message && (
        <p className="typo-caption1 mt-[10px] px-[10px] text-warning">
          {errors.position?.message}
        </p>
      )}
      <input type="hidden" {...register('position', positionValidation)} />
    </div>
  );
};

export default PositionInput;
