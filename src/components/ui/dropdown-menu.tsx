'use client';

import { cn } from '@/util/cn';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';

/**
 * Dropdown 컴포넌트
 *
 * @description
 * 드롭다운 메뉴를 구현한 컴포넌트입니다.
 * L, S, Custom 사이즈와 다양한 아이콘 타입, 스타일링 옵션을 제공합니다.
 *
 * @props IDropdownProps
 * @property {string | React.ReactNode} trigger - 드롭다운 버튼에 표시될 내용
 * @property {IDropdownItem[]} items - 드롭다운 메뉴 아이템 배열
 * @property {'l' | 's' | 'custom'} size - 드롭다운 크기
 *   - l: 122px (default)
 *   - s: 106px
 *   - custom: customStyle로 크기 지정
 * @property {'filter' | 'default' | 'none'} iconType - 아이콘 타입
 *   - filter: 상태에 따라 변경되는 화살표
 *   - default: 고정된 양방향 화살표
 *   - none: 아이콘 없음
 * @property {'default' | 'custom' | 'image'} variant - 드롭다운 변형
 * @property {string} className - trigger 커스텀 스타일링
 * @property {string} contentClassName - contents 커스텀 스타일링
 * @property {Object} customStyle - 커스텀 크기 설정 (width, height)
 * @property {number} sideOffset - contents와 trigger 사이 간격
 */

const DROPDOWN_SIZES = {
  LARGE: 'l',
  SMALL: 's',
  CUSTOM: 'custom',
} as const;

const ICON_TYPES = {
  FILTER: 'filter',
  DEFAULT: 'default',
  NONE: 'none',
} as const;

const DROPDOWN_VARIANTS = {
  DEFAULT: 'default',
  CUSTOM: 'custom',
  IMAGE: 'image',
} as const;

type DropdownSize = (typeof DROPDOWN_SIZES)[keyof typeof DROPDOWN_SIZES];
type IconType = (typeof ICON_TYPES)[keyof typeof ICON_TYPES];
type DropdownVariant =
  (typeof DROPDOWN_VARIANTS)[keyof typeof DROPDOWN_VARIANTS];

interface IDropdownItem {
  label: string;
  value?: string;
  onSelect?: () => void;
}
interface IDropdownProps {
  trigger: string | React.ReactNode;
  items: IDropdownItem[];
  size?: DropdownSize;
  iconType?: IconType;
  variant?: DropdownVariant;
  className?: string;
  imageProps?: Omit<React.ComponentProps<typeof Image>, 'alt'> & {
    alt?: string;
  };
  onOpenChange?: (open: boolean) => void;
  onSelect?: (value: string) => void;
  customStyle?: {
    width?: string;
    height?: string;
  } & {
    // size가 'custom'일 때 필수값으로 만들기
    width: string;
    height: string;
  };
  sideOffset?: number;
  contentClassName?: string;
}

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger> & {
    size?: DropdownSize;
    iconType?: IconType;
    variant?: DropdownVariant;
    imageProps?: Omit<React.ComponentProps<typeof Image>, 'alt'> & {
      alt?: string;
    };
    isOpen?: boolean;
    customStyle?: {
      width?: string;
      height?: string;
    };
  }
>(
  (
    {
      className,
      size = 'l',
      variant = 'default',
      iconType = 'none',
      isOpen,
      children,
      imageProps,
      customStyle,
      ...props
    },
    ref,
  ) => {
    const getSizeClasses = () => {
      switch (size) {
        case 'l':
          return 'h-10 w-[122px]';
        case 's':
          return 'h-10 w-[106px]';
        case 'custom':
          return `${customStyle?.height || ''} ${customStyle?.width || ''}`;
        default:
          return 'h-10 w-[122px]';
      }
    };

    const baseClasses = cn(
      'flex items-center rounded-xl text-sm font-medium transition-all duration-200',
      'select-none whitespace-nowrap outline-none',
      iconType !== 'none' ? 'justify-between' : 'justify-center',
      getSizeClasses(),
      !imageProps && 'px-4',
      imageProps && 'rounded-full p-0',
    );

    const variantClasses = imageProps
      ? 'bg-transparent hover:bg-transparent'
      : variant === 'custom'
        ? className
        : 'bg-main text-white';

    const renderIcon = () => {
      if (iconType === 'filter') {
        return isOpen ? (
          <ChevronUp className="h-6 w-6 shrink-0" />
        ) : (
          <ChevronDown className="h-6 w-6 shrink-0" />
        );
      } else if (iconType === 'default') {
        return <ChevronsUpDown className="h-6 w-6 shrink-0" />;
      }
      return null;
    };

    return (
      <DropdownMenuPrimitive.Trigger
        ref={ref}
        className={cn(baseClasses, variantClasses)}
        {...props}
      >
        {imageProps ? (
          <div className="flex h-full w-full items-center justify-center">
            <Image
              {...imageProps}
              alt={imageProps.alt || 'Dropdown trigger'}
              style={{ pointerEvents: 'none' }}
              priority
            />
          </div>
        ) : (
          <span>{children}</span>
        )}
        {renderIcon()}
      </DropdownMenuPrimitive.Trigger>
    );
  },
);
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> & {
    contentClassName?: string;
  }
>(({ className, contentClassName, sideOffset = 0, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-[116px] overflow-hidden rounded-md bg-popover text-popover-foreground shadow-md',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        'w-auto min-w-[116px] bg-Cgray200 p-[4px]',
        contentClassName || className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = 'DropdownMenuContent';

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
DropdownMenuItem.displayName = 'DropdownMenuItem';

const Dropdown = ({
  trigger,
  items,
  size = 'l',
  iconType,
  variant,
  className,
  imageProps,
  contentClassName,
  onOpenChange,
  onSelect,
  customStyle,
  sideOffset = 0,
}: IDropdownProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const contentId = React.useId(); // 고유 ID 생성

  // Props 유효성 검사
  React.useEffect(() => {
    if (size === 'custom' && !customStyle) {
      console.warn('Dropdown: customStyle is required when size is custom');
    }
    if (variant === 'image' && !imageProps) {
      console.warn('Dropdown: imageProps is required when variant is image');
    }
  }, [size, customStyle, variant, imageProps]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    onOpenChange?.(open);
  };

  return (
    <DropdownMenu onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger
        size={size}
        iconType={iconType}
        variant={variant}
        imageProps={imageProps}
        isOpen={isOpen}
        customStyle={customStyle}
        className={className}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={contentId}
        role="combobox"
      >
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        id={contentId}
        sideOffset={sideOffset}
        contentClassName={contentClassName}
        role="listbox"
        aria-orientation="vertical"
      >
        {items.map((item) => (
          <DropdownMenuItem
            key={item.label}
            size={size === 'custom' ? 'l' : size}
            role="option"
            aria-selected={false}
            tabIndex={-1}
            onSelect={() => {
              item.onSelect?.();
              if (item.value && onSelect) {
                onSelect(item.value);
              }
            }}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export {
  Dropdown,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
};

export default Dropdown;
