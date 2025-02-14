import { cn } from '@/util/cn';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const floatingButtonVariants = cva(
  'fixed bottom-6 right-6 inline-flex items-center justify-center gap-2 rounded-full bg-main text-white transition-colors hover:opacity-90 focus-visible:outline-none disabled:pointer-events-none disabled:bg-disable disabled:text-disable_text [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        icon: ['h-14 w-14', '[&_svg]:size-6'],
        text: ['typo-head3', 'p-4', '[&_svg]:size-6'],
      },
    },
    defaultVariants: {
      variant: 'icon',
    },
  },
);

export interface FloatingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof floatingButtonVariants> {
  asChild?: boolean;
  icon?: React.ReactNode;
}

/**
 * Floating Button 컴포넌트입니다.(기본 fixed 우측하단-6)
 * @example
 * // 아이콘만 있는 경우
 * <FloatingButton icon={<Plus />} />
 *
 * // 텍스트와 함께 사용
 * <FloatingButton icon={<Plus />} variant="text">모임 만들기</FloatingButton>
 *
 * @param {object} props
 * @param {string} [props.className] - Tailwind CSS 클래스를 통한 커스텀 스타일
 * @param {'icon' | 'text'} [props.variant='icon'] - 버튼의 스타일 variant (아이콘만 있는 경우 / 텍스트가 있는 경우)
 * @param {React.ReactNode} [props.icon] - 버튼에 표시될 아이콘
 * @param {boolean} [props.disabled] - 버튼 비활성화 상태
 * @param {() => void} [props.onClick] - 클릭 이벤트 핸들러
 * @param {boolean} [props.asChild=false] - true일 경우 다른 컴포넌트로 래핑 가능
 */
const FloatingButton = React.forwardRef<HTMLButtonElement, FloatingButtonProps>(
  ({ className, variant, icon, children, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(floatingButtonVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        {icon}
        {children}
      </Comp>
    );
  },
);

FloatingButton.displayName = 'FloatingButton';

export { FloatingButton, floatingButtonVariants };
