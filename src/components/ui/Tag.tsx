import { cn } from '@/util/cn';
import { type VariantProps, cva } from 'class-variance-authority';
import Image from 'next/image';
import * as React from 'react';

const tagVariants = cva(
  'typo-caption1 inline-flex items-center rounded-[24px] px-2 py-1 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        blue: ['bg-main', 'text-white'],
        purple: ['bg-default', 'text-main'],
        green: ['bg-green', 'text-clear'],
      },
    },
    defaultVariants: {
      variant: 'blue',
    },
  },
);

export interface TagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {
  iconUrl?: string;
}

/**
 * 기본적인 태그 컴포넌트입니다.
 * @example
 * // 기본 사용법
 * <Tag>텍스트</Tag>
 *
 * // 아이콘과 함께 사용
 * <Tag iconUrl='/React.png'>텍스트</Tag>
 *
 * // variant 사용
 * <Tag variant="grreen">텍스트</Tag>
 *
 * @param {object} props
 * @param {string} [props.className] - Tailwind CSS 클래스를 통한 커스텀 스타일
 * @param {'blue' | 'purple' | 'green'} [props.variant='blue'] - 태그의 시각적 스타일 variant (기본 blue)
 * @param {React.ReactNode} [props.iconUrl] - 태그 텍스트 좌측에 위치할 아이콘 이미지 경로
 */

function Tag({ className, variant, iconUrl, children, ...props }: TagProps) {
  return (
    <div className={cn(tagVariants({ variant }), className)} {...props}>
      {iconUrl && (
        <Image
          src={iconUrl}
          alt="tag_icon"
          className="mr-1"
          width="15"
          height="15"
        />
      )}
      {children}
    </div>
  );
}

export { Tag, tagVariants };
