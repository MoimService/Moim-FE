'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/Dropdown';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const menus = ['마이페이지', '로그아웃'];

export default function Home() {
  const router = useRouter();
  const filterOptions = [
    { value: 'all', label: '전체' },
    { value: 'completed', label: '완료됨' },
    { value: 'pending', label: '진행 중' },
  ];
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  return (
    <div>
      <h2 className="typo-head1">옵션</h2>
      <DropdownMenu>
        <DropdownMenuTrigger>Large - size=l</DropdownMenuTrigger>
        <DropdownMenuContent>
          {menus.map((menu) => (
            <DropdownMenuItem key={menu}>{menu}</DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="h-20"></div>

      <DropdownMenu>
        <DropdownMenuTrigger>Small - size=s</DropdownMenuTrigger>
        <DropdownMenuContent>
          {menus.map((menu) => (
            <DropdownMenuItem key={menu} size="s">
              {menu}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="h-20"></div>
      <h2 className="typo-head1">사용 예시</h2>

      <DropdownMenu>
        <DropdownMenuTrigger>프로필</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem size="s" onSelect={() => router.push('/mypage')}>
            마이페이지
          </DropdownMenuItem>
          <DropdownMenuItem
            size="s"
            onSelect={() => {
              alert('로그아웃');
            }}
          >
            로그아웃
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="h-20"></div>

      <DropdownMenu>
        <DropdownMenuTrigger>
          {selectedFilter
            ? filterOptions.find((f) => f.value === selectedFilter)?.label
            : '필터 선택'}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {filterOptions.map((filter) => (
            <DropdownMenuItem
              key={filter.value}
              size="s"
              onSelect={() => setSelectedFilter(filter.value)}
            >
              {filter.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
