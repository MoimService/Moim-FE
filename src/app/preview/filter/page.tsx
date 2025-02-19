'use client';

import profileImage from '@/assets/icon/profile.jpg';
import Dropdown from '@/components/ui/dropdown-menu';
import { useState } from 'react';

export default function DropdownPage() {
  const [selectedBasic, setSelectedBasic] = useState<string>('');

  const basicOptions = [
    { label: '최신순', value: 'latest' },
    { label: '오래된순', value: 'oldest' },
    { label: '좋아요순', value: 'likes' },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-8">
      {/* 1. 기본 Large 사이즈 드롭다운 
          - size="l": 122px 너비
          - iconType="filter": 상태에 따라 변경되는 화살표
          - onSelect: 아이템 선택 시 콜백
          - onOpenChange: 드롭다운 열림/닫힘 상태 변경 시 콜백 */}
      <div className="text-[50px] font-bold">L 사이즈</div>
      <Dropdown
        trigger={
          selectedBasic
            ? basicOptions.find((f) => f.value === selectedBasic)?.label
            : '최신순'
        }
        items={basicOptions}
        size="l"
        iconType="filter"
        onSelect={(value) => {
          setSelectedBasic(value); // trigger에 표시될 값 업데이트
        }}
      />
      {/* 2. Small 사이즈 드롭다운 
          - size="s": 106px 너비
          - iconType="filter": 상태에 따라 변경되는 화살표 */}
      <div className="text-[50px] font-bold">S 사이즈</div>
      <Dropdown
        trigger="최신순"
        items={basicOptions}
        size="s"
        iconType="filter"
      />
      {/* 3. 아이콘 타입 예시
          - filter: 상태에 따라 변경되는 화살표
          - default: 고정된 양방향 화살표
          - none: 아이콘 없음 */}
      <section>
        <h2 className="mb-6 text-2xl font-bold">2. 아이콘 타입</h2>
        <div className="flex items-center gap-4">
          <Dropdown trigger="최신순" items={basicOptions} iconType="filter" />
          <Dropdown trigger="최신순" items={basicOptions} iconType="default" />
          <Dropdown trigger="최신순" items={basicOptions} iconType="none" />
        </div>
      </section>
      {/* 4. 이미지 드롭다운 예시
          - variant="image": 이미지 모드
          - sideOffset: contents와 trigger 사이 간격
          - imageProps: 이미지 관련 설정 */}
      <section>
        <h2 className="mb-6 text-2xl font-bold">3. 이미지 드롭다운</h2>
        <div className="flex items-center gap-4">
          <Dropdown
            trigger=""
            sideOffset={10}
            items={basicOptions}
            variant="image"
            imageProps={{
              src: profileImage.src,
              width: 60,
              height: 60,
              alt: 'Profile Image',
              className: 'rounded-full',
            }}
          />
        </div>
      </section>
      {/* 5. 커스텀 스타일링 예시
          - size="custom": 자유로운 크기 설정
          - customStyle: trigger 크기 지정
          - className: trigger 스타일 지정
          - contentClassName: contents 스타일 지정 */}
      <section>
        <h2 className="mb-6 text-2xl font-bold">4. 커스텀 스타일링</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Dropdown
              trigger="커스텀 크기"
              items={basicOptions}
              size="custom"
              customStyle={{
                width: 'w-[200px]',
                height: 'h-[50px]',
              }}
            />
            <Dropdown
              trigger="커스텀 크기"
              items={basicOptions}
              variant="custom"
              className="bg-Cgray200 text-main"
              contentClassName="w-[300px]"
              size="custom"
              customStyle={{
                width: 'w-[200px]',
                height: 'h-[50px]',
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
