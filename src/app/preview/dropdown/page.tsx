'use client';

import Dropdown from '@/components/common/Dropdown';
import { useState } from 'react';

export default function Home() {
  const [selectedFilter] = useState<string | null>(null);
  const filterOptions = [
    { value: 'all', label: '전체' },
    { value: 'completed', label: '완료됨' },
    { value: 'pending', label: '진행 중' },
  ];
  const menus = [
    {
      label: '마이페이지',
      onSelect: () => {
        alert('마이페이지');
      },
    },
    {
      label: '로그아웃',
      onSelect: () => {
        alert('로그아웃');
      },
    },
  ];
  const widthSizeTemp = [
    { label: '전체전체전체전체전체' },
    { label: '완료됨' },
    { label: '진행 중' },
  ];
  return (
    <div>
      <h2 className="typo-head1">옵션</h2>
      <Dropdown trigger={'Large - size=l'} items={menus} />

      <div className="h-20"></div>

      <Dropdown trigger={'Small - size='} items={menus} size="s" />

      <div className="h-20"></div>
      <h2 className="typo-head1">사용 예시</h2>

      <Dropdown trigger={'프로필'} items={menus} size="s" />

      <div className="h-20"></div>

      <Dropdown
        trigger={
          selectedFilter
            ? filterOptions.find((f) => f.value === selectedFilter)?.label
            : '필터 선택'
        }
        items={filterOptions}
        sideOffset={8}
      />

      <div className="h-20"></div>

      <Dropdown
        trigger={<div className="w-[100px] border">트리거</div>}
        items={widthSizeTemp}
      />
    </div>
  );
}
