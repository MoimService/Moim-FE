'use client';

import { cn } from '@/util/cn';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { ChevronDown, ChevronsUpDown } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';

interface IDropdownOption {
  value: string;
  label: string;
  onSelect?: () => void;
}

interface IDropdownProps {
  options?: IDropdownOption[]; // 드롭다운에 표시될 옵션들
  onChange?: (value: string) => void; // 선택 변경 시 호출될 콜백
  variant?: 'default' | 'icon' | 'doubleArrow' | 'image'; // 드롭다운 스타일 변형
  size?: 's' | 'l'; // 크기 옵션
  className?: string; // 트리거 스타일 커스터마이징
  contentClassName?: string; // 드롭다운 메뉴 스타일 커스터마이징
  imageProps?:
    | {
        component: React.ReactNode;
      }
    | (Omit<React.ComponentProps<typeof Image>, 'alt'> & {
        alt?: string;
      }); // 이미지 드롭다운을 위한 속성
  sideOffset?: number; // 드롭다운 메뉴와 트리거 사이 간격
  trigger?: string; // 선택되지 않았을 때 표시될 텍스트
}

const Dropdown = ({
  options = [],
  onChange,
  variant = 'default',
  size = 'l',
  sideOffset = 4,
  className,
  contentClassName,
  imageProps,
  trigger = '선택하세요',
}: IDropdownProps) => {
  const [isOpen, setIsOpen] = React.useState(false); // 드롭다운 열림/닫힘 상태
  const [selectedValue, setSelectedValue] = React.useState<string | null>(null); // 현재 선택된 값
  const triggerRef = React.useRef<HTMLButtonElement>(null); // 트리거 요소에 대한 참조
  const [triggerWidth, setTriggerWidth] = React.useState(0); // 트리거 너비 저장

  // 트리거 너비를 측정하는 효과
  React.useEffect(() => {
    if (triggerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setTriggerWidth(entry.contentRect.width);
        }
      });

      resizeObserver.observe(triggerRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  const selectedOption = options.find((opt) => opt.value === selectedValue); // 선택된 옵션 찾기

  const sizeClasses = {
    s: 'h-10 w-[106px]',
    l: 'h-10 w-[122px]',
  }[size];

  const handleSelect = (option: IDropdownOption) => {
    setSelectedValue(option.value); // 내부 상태 업데이트
    onChange?.(option.value); // 외부 콜백 호출
    option.onSelect?.(); // 옵션별 콜백 호출
  };

  const renderTriggerContent = () => {
    if (imageProps) {
      if ('component' in imageProps) {
        return (
          <div className="flex h-full w-full items-center justify-center outline-none focus:outline-none">
            {imageProps.component}
          </div>
        );
      }
      return (
        <div className="flex h-full w-full items-center justify-center outline-none focus:outline-none">
          <Image
            {...imageProps}
            alt={imageProps.alt || 'Dropdown trigger'}
            className={cn('rounded-full', imageProps.className)}
          />
        </div>
      );
    } //이미지 드롭다운

    if (variant === 'default') {
      return <span>{trigger}</span>;
    } // 기본 스타일

    // 아이콘이 있는 variant의 경우 선택된 값이 있으면 그 값을, 없으면 trigger를 표시
    return (
      <>
        <span>{selectedOption ? selectedOption.label : trigger}</span>
        {variant === 'doubleArrow' ? (
          <ChevronsUpDown className="h-[24px] w-[24px]" />
        ) : (
          <ChevronDown
            className={cn(
              'h-[24px] w-[24px]',
              'transition-transform',
              isOpen && 'rotate-180',
            )}
          />
        )}
      </>
    ); // 아이콘이 있는 스타일
  };

  const shouldChangeBackground =
    variant !== 'default' &&
    variant !== 'image' &&
    !className?.includes('w-[460px]');

  return (
    <DropdownMenuPrimitive.Root onOpenChange={setIsOpen}>
      <DropdownMenuPrimitive.Trigger
        ref={triggerRef}
        className={cn(
          'flex select-none items-center whitespace-nowrap rounded-xl font-bold outline-none focus:outline-none',
          variant === 'default' ? 'justify-center' : 'justify-between',
          'px-4',
          sizeClasses,
          shouldChangeBackground
            ? cn(isOpen ? 'bg-main text-white' : 'bg-Cgray200 text-Cgray400')
            : 'bg-Cgray200 text-Cgray400',
          'transition-colors',
          imageProps ? 'p-0' : '',
          className,
        )}
      >
        {renderTriggerContent()}
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          sideOffset={sideOffset}
          className={cn(
            'z-50 min-w-[116px] overflow-hidden rounded-md p-1 shadow-md',
            'bg-Cgray200', // 기본 배경색 설정
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            contentClassName,
          )}
          style={{
            width: className?.includes('w-full')
              ? `${triggerWidth}px`
              : undefined,
          }}
        >
          {options.map((option) => (
            <DropdownMenuPrimitive.Item
              key={option.value}
              onSelect={() => handleSelect(option)}
              className={cn(
                'relative flex w-full cursor-pointer select-none items-center',
                'typo-body1 h-[34px] rounded-[10px] px-[12px] py-[8px]',
                'text-Cgray400 hover:bg-Cgray300 hover:text-Cgray700',
                'outline-none transition-colors',
                size === 's' ? 'typo-body2' : 'typo-body1',
                option.value === selectedValue && 'bg-Cgray300 text-Cgray700',
              )}
            >
              {option.label}
            </DropdownMenuPrimitive.Item>
          ))}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
};

export default Dropdown;
