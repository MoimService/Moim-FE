'use client';

import { cn } from '@/util/cn';
import { VariantProps, cva } from 'class-variance-authority';
import { Eye, EyeOff } from 'lucide-react';
import * as React from 'react';

interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  /**
   * 입력 필드의 상태 (기본값: `'default'`)
   * - `'default'` : 기본 상태 (테두리 없음)
   * - `'success'` : 성공 상태 (메인 컬러 테두리 적용)
   * - `'error'` : 에러 상태 (경고 컬러 테두리 및 텍스트 적용)
   */
  state?: 'default' | 'success' | 'error';
  /**
   * 입력 필드의 크기 (기본값: `'l'`)
   * - `'s'` : 작은 크기 (36px)
   * - `'l'` : 기본 크기 (50px)
   */
  inputSize?: 'l' | 's';
  /**
   * 에러 메시지 (에러 상태일 때 표시)
   */
  errorMessage?: string;
}

const inputVariants = cva(
  'box-border flex w-full rounded-md border-transparent bg-Cgray200 px-3 px-[16px] py-1 py-[14px] text-base text-Cgray700 caret-Cgray500 shadow-sm transition-colors placeholder:text-Cgray400 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-disable disabled:text-disable_text md:text-sm',
  {
    variants: {
      state: {
        default: '',
        success: 'border border-main',
        error: 'border border-warning text-warning caret-warning',
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

/**
 * `Input` 컴포넌트
 *
 * 기본적인 입력 필드로, 텍스트 및 비밀번호 입력을 지원하며,
 * 에러 상태 및 성공 상태를 지정할 수 있습니다.
 *
 * @example
 * // 기본 사용법
 * <Input placeholder="텍스트를 입력하세요" />
 *
 * @example
 * // 에러 상태
 * <Input state="error" errorMessage="필수 입력 사항입니다." />
 *
 * @example
 * // 성공 상태
 * <Input state="success" />
 *
 * @example
 * // 비밀번호 입력 필드 (눈 아이콘 포함)
 * <Input type="password" />
 *
 * @param {IInputProps} props - `Input` 컴포넌트의 속성
 * @returns {JSX.Element} `Input` 요소
 */
const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      className,
      type,
      state = 'default',
      errorMessage,
      inputSize = 'l',
      ...props
    },
    ref,
  ) => {
    const [isVisible, setIsVisible] = React.useState(false);

    return (
      <div className={`w-full ${className}`}>
        <div className="relative focus-within:text-Cgray700">
          <input
            type={
              type === 'password' ? (isVisible ? 'text' : 'password') : 'text'
            }
            className={cn(
              inputVariants({ state, inputSize }),
              !!errorMessage &&
                'border border-warning text-warning caret-warning',
            )}
            ref={ref}
            {...props}
          />
          <button
            onClick={() => setIsVisible((prev) => !prev)}
            className={`absolute right-[16px] top-1/2 -translate-y-1/2 text-Cgray500 focus-within:text-Cgray700 ${type !== 'password' && 'hidden'}
`}
          >
            {!isVisible ? (
              <EyeOff className={`size-5 `} />
            ) : (
              <Eye className={`size-5 `} />
            )}
          </button>
        </div>
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
