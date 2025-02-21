import { cn } from '@/util/cn';
import React from 'react';

interface IChipProps extends React.ComponentPropsWithRef<'div'> {
  isActive?: boolean;
}

const Chip = React.forwardRef<HTMLDivElement, IChipProps>(
  ({ children, className, isActive = false, ...props }, ref) => {
    return (
      <div
        className={cn(
          'typo-button2 flex h-[40px] items-center justify-center rounded-[8px] px-[16px] py-[12px]',
          isActive ? 'bg-default text-main' : 'bg-disable text-Cgray500',
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Chip.displayName = 'Chip';

export default Chip;
