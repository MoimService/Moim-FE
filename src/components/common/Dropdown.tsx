import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/Dropdown';

interface IDropdownProps {
  /**
   * 트리거 요소입니다. 버튼 또는 문자열 등 컴포넌트로 전달할 수 있습니다.
   * @example
   * <Dropdown trigger={<button>메뉴 열기</button>} items={[]} />
   */
  trigger: React.ReactNode;

  /**
   * 드롭다운에서 보여질 아이템 리스트입니다.
   * - `label`: 필수값으로 화면에 보여지는 텍스트입니다.
   * - `value`: 아이템의 식별을 위한 값 (선택 사항).
   * - `onSelect`: 아이템 클릭 시 실행될 함수 (선택 사항).
   * @example
   * <Dropdown
   *   items={[
   *     { label: '마이페이지', value: 'mypage', onSelect: () => console.log('마이페이지 이동') },
   *     { label: '로그아웃', value: 'logout', onSelect: () => console.log('로그아웃') },
   *   ]}
   * />
   */
  items: { label: string; value?: string; onSelect?: () => void }[];

  /**
   * 아이템의 크기입니다. `'s'`(작은 크기)와 `'l'`(큰 크기) 두 가지 옵션이 있습니다.
   * @default "l"
   * @example
   * <Dropdown size="s" items={[]} />
   */
  size?: 's' | 'l';

  /**
   * 트리거 요소와의 간격입니다. `px` 단위로 설정됩니다.
   * @default 4
   * @example
   * <Dropdown sideOffset={8} items={[]} />
   */
  sideOffset?: number;

  /**
   * 스타일을 커스텀할 수 있도록 제공됩니다. Tailwind CSS 또는 추가 스타일을 적용할 수 있습니다.
   * @example
   * <Dropdown className="bg-red-500" items={[]} />
   */
  className?: string;
}

/**
 * 드롭다운 컴포넌트
 * @example
 * <Dropdown
 *   trigger={<button>메뉴</button>}
 *   items={[
 *     { label: '마이페이지', value: 'mypage', onSelect: () => console.log('마이페이지 이동') },
 *     { label: '로그아웃', value: 'logout', onSelect: () => console.log('로그아웃') },
 *   ]}
 *   size="s"
 *   sideOffset={8}
 *   className="custom-dropdown"
 * />
 */
const Dropdown = ({
  trigger,
  items,
  size,
  sideOffset,
  className,
}: IDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className={className} sideOffset={sideOffset}>
        {items.map((item) => (
          <DropdownMenuItem
            key={item.label}
            size={size}
            onSelect={item.onSelect}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default Dropdown;
