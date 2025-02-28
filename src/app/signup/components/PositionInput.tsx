import { positionValidation } from '@/util/validation';
import { useWatch } from 'react-hook-form';

import { ChipContainer } from './ChipContainer';
import { ISignupInputProps } from './NameInput';

interface IPositionInputProps extends ISignupInputProps {
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
      <ChipContainer position={position} setPosition={handleClickPosition} />
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
