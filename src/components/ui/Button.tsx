import { cn } from '@/util/cn';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-[10px] whitespace-nowrap rounded-md transition-colors focus-visible:outline-none disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        solid: [
          'bg-main',
          'text-white',
          'hover:opacity-90',
          'disabled:bg-disable disabled:text-disable_text',
        ],
        default: [
          'bg-default',
          'text-main',
          'hover:opacity-90',
          'disabled:bg-disable disabled:text-disable_text',
        ],
        outline: [
          'border border-main',
          'text-main',
          'hover:bg-default',
          'disabled:border-disable disabled:text-disable_text',
        ],
        text: [
          'text-main',
          'hover:text-opacity-80',
          'disabled:text-disable_text',
        ],
      },
      size: {
        default: ['typo-button1 h-[46px] w-[332px]'],
        sm: ['typo-button2 h-10 w-[120px]'],
      },
    },
    defaultVariants: {
      variant: 'solid',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: React.ReactNode;
}

/**
 * 기본적인 버튼 컴포넌트입니다.
 * @example
 * // 기본 사용법
 * <Button>텍스트</Button>
 *
 * // 아이콘과 함께 사용
 * <Button icon={<Star />}>텍스트</Button>
 *
 * // variant 사용
 * <Button variant="outline">텍스트</Button>
 *
 * // size 사용
 * <Button size="sm">텍스트</Button>
 *
 * @param {object} props
 * @param {string} [props.className] - Tailwind CSS 클래스를 통한 커스텀 스타일
 * @param {'solid' | 'default' | 'outline' | 'text'} [props.variant='solid'] - 버튼의 시각적 스타일 variant
 * @param {'default' | 'sm'} [props.size='default'] - 버튼 크기 (default: 332x46px, sm: 120x40px)
 * @param {React.ReactNode} [props.icon] - 버튼 텍스트 좌측에 위치할 아이콘 (lucide-react 권장)
 * @param {boolean} [props.disabled] - 버튼 비활성화 상태
 * @param {(event) => void} [props.onClick] - 클릭 이벤트 핸들러
 * @param {boolean} [props.asChild=false] - true일 경우 다른 컴포넌트로 래핑 가능
 */

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, icon, children, asChild = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {icon}
        {children}
      </Comp>
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
