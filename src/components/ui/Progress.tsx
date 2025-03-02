'use client';

import Person from '@/assets/icon/person.svg';
import { cn } from '@/util/cn';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';

interface BaseProgressProps {
  className?: string;
  value: number;
  total?: number;
  showCounter?: boolean;
}

type ProgressProps = BaseProgressProps;

/**
 * 진행 상태를 시각적으로 표시하는 Progress 컴포넌트
 *
 * @component
 * @example
 *
 * // 전체 값 대비 진행률만 표시
 * <Progress value={30} total={100} />
 *
 * // 아이콘까지 같이 표시
 * <Progress value={75} total={100} showCounter={true} />
 */

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, total, value, showCounter = false, ...props }, ref) => {
    // 진행률 계산
    const percentage = total ? (value / total) * 100 : value;

    return (
      <div className={cn('w-full', className)} ref={ref}>
        <ProgressPrimitive.Root
          className="relative h-[6px] w-full overflow-hidden rounded-full bg-Cgray100"
          {...props}
        >
          <ProgressPrimitive.Indicator
            className="h-full bg-main transition-all duration-200"
            style={{
              width: `${percentage}%`,
              transition: 'width 0.2s ease-in-out',
            }}
          />
        </ProgressPrimitive.Root>
        {showCounter && total && (
          <div className="relative mt-2 flex items-center justify-end">
            <Person />
            <span className="typo-body2 ml-1 text-Cgray500 md:typo-button1 lg:typo-button1">
              {value}/{total}
            </span>
          </div>
        )}
      </div>
    );
  },
);

Progress.displayName = 'Progress';

export { Progress };
