import { cn } from '@/util/cn';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

export const userStatusKeys = {
  APPROVED: '참여',
  REJECTED: '거절',
  PENDING: '대기',
  EXPEL: '강퇴',
} as const;

export type UserStatus = keyof typeof userStatusKeys;

const tagVariants = cva(
  'typo-caption1 inline-flex items-center rounded-[10px] p-3 font-semibold transition-colors focus:ring-offset-2',
  {
    variants: {
      variant: {
        APPROVED: ['bg-blue', 'text-main'],
        REJECTED: ['bg-gray', 'text-white'],
        PENDING: ['bg-green', 'text-clear'],
        EXPEL: ['bg-red', 'text-warning'],
      },
    },
    defaultVariants: {
      variant: 'APPROVED',
    },
  },
);

export interface TagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {
  variant: UserStatus;
}

/**
 * 기본적인 태그 컴포넌트입니다.
 * @example
 *
 * // variant 사용
 * <Tag variant="APPROVED"/>
 *
 * @param {object} props
 * @param {string} [props.className] - Tailwind CSS 클래스를 통한 커스텀 스타일
 * @param {'APPROVED' | 'REJECTED' | 'PENDING' | 'EXPEL'} [props.variant='APPROVED'] - 태그의 시각적 스타일 variant (기본 APPROVED)
 * @param {React.ReactNode} [props.iconUrl] - 태그 텍스트 좌측에 위치할 아이콘 이미지 경로
 */

function Tag({ className, variant, children, ...props }: TagProps) {
  const statusText = children ?? userStatusKeys[variant];

  return (
    <div className={cn(tagVariants({ variant }), className)} {...props}>
      {statusText}
    </div>
  );
}

export { Tag, tagVariants };
