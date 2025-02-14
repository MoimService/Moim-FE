import { cn } from '@/util/cn';
import { VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  errorMessage?: string;
}

const inputVariants = cva(
  'box-border flex w-full rounded-md border-input bg-Cgray200 px-3 px-[16px] py-1 py-[14px] text-base text-Cgray700 caret-Cgray500 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-Cgray400 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:bg-disable disabled:text-disable_text md:text-sm',
  {
    variants: {
      isValid: {
        true: 'border border-main',
        false: 'border border-warning text-warning caret-warning',
      },
      inputSize: {
        s: 'typo-button2 h-[36px]',
        l: 'typo-button1 h-[50px] py-[10px]',
      },
    },
    defaultVariants: {
      inputSize: 'l',
    },
  },
);

const errorTextVariants = cva('px-[10px] text-warning', {
  variants: {
    inputSize: {
      s: 'typo-caption2 mt-[8px]',
      l: 'typo-caption1 mt-[10px]',
    },
    defaultVariants: {
      inputSize: 'l',
    },
  },
});

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ className, type, isValid, errorMessage, inputSize, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(inputVariants({ isValid, inputSize, className }))}
          ref={ref}
          {...props}
        />
        {errorMessage && (
          <p className={cn(errorTextVariants({ inputSize, className }))}>
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
