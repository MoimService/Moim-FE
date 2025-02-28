'use client';

import Profile from '@/assets/icon/profile.svg';
import Dropdown from '@/components/common/Dropdown';
import { useState } from 'react';

/**
 * 드롭다운 컴포넌트 사용 예시 페이지
 *
 * @example 기본 사용법
 * const options = [
 *   { value: 'option1', label: '옵션 1' },
 *   { value: 'option2', label: '옵션 2', onSelect: () => console.log('옵션 2 선택됨') }
 * ];
 *
 * <Dropdown
 *   options={options}
 *   trigger="선택하세요"
 *   variant="default"
 *   size="l"
 * />
 *
 * @description 드롭다운 옵션 설명
 * 1. variant (드롭다운 스타일 변형)
 *   - 'default': 기본 스타일 (아이콘 없음)
 *   - 'icon': 회전하는 화살표 아이콘
 *   - 'doubleArrow': 양방향 화살표 아이콘
 *   - 'image': 이미지 전용 드롭다운
 *
 * 2. size (드롭다운 크기)
 *   - 'l': Large (width: 122px)
 *   - 's': Small (width: 106px)
 *
 * 3. 스타일 커스터마이징
 *   - className: 트리거 버튼 스타일
 *   - contentClassName: 드롭다운 메뉴 스타일
 *
 * 4. 상태 관리
 *   - defaultValue: 초기 선택값
 *   - onChange: 선택 변경 시 호출되는 함수
 *
 * 5. 이미지 드롭다운
 *   - imageProps: Image 컴포넌트 props (src, width, height, alt 등)
 */
export default function Home() {
  // 필터 옵션 예시: 정렬 기준 선택
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  // 옵션 예시 1: 단순 선택 옵션
  const filterOptions = [
    { value: 'latest', label: '최신순' },
    { value: 'oldest', label: '오래된순' },
    { value: 'like', label: '좋아요순' },
  ];

  const filterAreaOptions = [
    { value: 'frontend', label: '프론트엔드' },
    { value: 'backend', label: '백엔드' },
    { value: 'designer', label: '디자이너' },
  ];

  // 옵션 예시 2: 액션이 포함된 메뉴
  const menuOptions = [
    {
      value: 'mypage',
      label: '마이페이지',
      onSelect: () => {
        alert('마이페이지');
      },
    },
    {
      value: 'logout',
      label: '로그아웃',
      onSelect: () => {
        alert('로그아웃');
      },
    },
  ];

  return (
    <div className="space-y-8 p-8">
      {/* 1. 기본 드롭다운 예시 */}
      <section>
        <h2 className="mb-6 text-2xl font-bold">1. 기본 드롭다운</h2>
        <div className="space-y-4">
          {/* Large 사이즈 예시 */}
          <Dropdown
            options={menuOptions}
            trigger="기본"
            variant="default"
            size="l"
          />

          {/* Small 사이즈 예시 */}
          <Dropdown options={menuOptions} trigger="S" size="s" />
        </div>
      </section>

      {/* 2. 상태 관리가 포함된 드롭다운 예시 */}
      <section>
        <h2 className="mb-6 text-2xl font-bold">
          2. 선택 상태가 있는 드롭다운
        </h2>
        {/* 회전 화살표 아이콘 예시 */}
        <Dropdown
          options={filterOptions}
          onChange={setSelectedFilter}
          trigger="최신순"
          variant="icon"
          sideOffset={8}
        />
        <div className="py-5" />
        {/* 양방향 화살표 아이콘 예시 */}
        <Dropdown
          options={filterOptions}
          onChange={setSelectedFilter}
          trigger="최신순"
          variant="doubleArrow"
          sideOffset={8}
        />
      </section>

      {/* 3. 이미지 드롭다운 예시 */}
      <section>
        <h2 className="mb-6 text-2xl font-bold">3. 이미지 드롭다운</h2>
        <Dropdown
          options={menuOptions}
          variant="image"
          className="ml-[200px] h-10 w-10 rounded-full"
          contentClassName="mr-[85px]"
          imageProps={{
            component: <Profile className="h-10 w-10" />,
          }}
        />
      </section>

      {/* 4. 커스텀 스타일링 예시 */}
      <section>
        <h2 className="mb-6 text-2xl font-bold">4. 커스텀 스타일 드롭다운</h2>
        <Dropdown
          options={filterAreaOptions}
          trigger="Selected"
          onChange={setSelectedFilter}
          className="w-[460px]"
          contentClassName="w-[460px]"
          variant="icon"
        />
      </section>
    </div>
  );
}
