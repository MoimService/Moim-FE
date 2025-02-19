'use client';

import { cn } from '@/util/cn';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as React from 'react';

/**
 * DropdownMenu 컴포넌트는 드롭다운 메뉴의 루트 요소입니다.
 * @example
 * <DropdownMenu>
 *   <DropdownMenuTrigger>메뉴 열기</DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem>옵션 1</DropdownMenuItem>
 *     <DropdownMenuItem>옵션 2</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 */
const DropdownMenu = DropdownMenuPrimitive.Root;

/**
 * DropdownMenuTrigger 컴포넌트는 드롭다운 메뉴를 여는 트리거 버튼입니다.
 * @example
 * <DropdownMenuTrigger>
 *   <button>클릭하여 메뉴 열기</button>
 * </DropdownMenuTrigger>
 */
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

/**
 * DropdownMenuContent 컴포넌트는 드롭다운 메뉴의 내용 영역을 정의합니다.
 * @example
 * <DropdownMenuContent sideOffset={8}>
 *   <DropdownMenuItem>옵션 1</DropdownMenuItem>
 *   <DropdownMenuItem>옵션 2</DropdownMenuItem>
 * </DropdownMenuContent>
 * @param {object} props
 * @param {string} [props.className] - Tailwind CSS 클래스를 통한 커스텀 스타일링
 * @param {number} [props.sideOffset=0] - 드롭다운이 트리거로부터 떨어지는 거리 (기본값: 0)
 */
const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 0, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-[116px] overflow-hidden rounded-md bg-popover text-popover-foreground shadow-md',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        'w-auto min-w-[116px] bg-Cgray200 p-[4px]',
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

/**
 * DropdownMenuItem 컴포넌트는 드롭다운 메뉴의 개별 항목을 나타냅니다.
 * @example
 * <DropdownMenuItem size='s' onSelect={() => console.log('선택됨')}>
 *   옵션 1
 * </DropdownMenuItem>
 * @param {object} props
 * @param {string} [props.className] - Tailwind CSS 클래스를 통한 커스텀 스타일링
 * @param {'s' | 'l'} [props.size='l'] - 아이템의 크기 ('s' 또는 'l')
 * @param {() => void} [props.onSelect] - 아이템이 선택되었을 때 실행할 함수
 */
const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    size?: 's' | 'l';
    onSelect?: () => void;
  }
>(({ className, size = 'l', onSelect, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    onSelect={onSelect}
    className={cn(
      'relative flex cursor-default select-none items-center gap-2 outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0',
      'typo-body1 h-[34px] w-[108px] rounded-[10px] px-[12px] py-[8px] text-Cgray400 hover:bg-Cgray300 hover:text-Cgray700',
      'w-auto min-w-[108px] whitespace-nowrap',
      {
        s: 'typo-body2',
        l: 'typo-body1',
      }[size],
      className,
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
};
