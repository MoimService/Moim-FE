'use client';

import { Button } from '@/components/ui/Button';
import { FloatingButton } from '@/components/ui/FloatingButton';
import {
  ArrowUp,
  Download,
  Heart,
  LogOut,
  MessageCircle,
  Plus,
  Settings,
  Share2,
  Star,
} from 'lucide-react';
import React, { useCallback, useState } from 'react';

export default function ButtonExamples() {
  const handleClick = () => {
    alert('hiii');
  };

  return (
    <div className="bg-gray-50 flex flex-col gap-8 p-8 pb-32">
      {/* Default buttons with different variants */}
      <div className="space-y-4">
        <h2 className="mb-4 text-xl font-semibold">기본 버튼 스타일</h2>
        <div className="flex flex-col gap-4">
          <Button onClick={handleClick} icon={<Heart />}>
            좋아요
          </Button>
          <Button variant="default" icon={<MessageCircle />}>
            댓글 작성
          </Button>
          <Button variant="outline" icon={<Share2 />}>
            공유하기
          </Button>
          <Button variant="text" icon={<Star />}>
            즐겨찾기
          </Button>
        </div>
      </div>
      {/* Small buttons row */}
      <div className="space-y-4">
        <h2 className="mb-4 text-xl font-semibold">작은 크기 버튼</h2>
        <div className="flex flex-wrap gap-4">
          <Button size="sm" icon={<Download />}>
            다운로드
          </Button>
          <Button size="sm" variant="default" icon={<Settings />}>
            설정
          </Button>
          <Button size="sm" variant="outline" icon={<LogOut />}>
            로그아웃
          </Button>
        </div>
      </div>
      {/* Disabled states */}
      <div className="space-y-4">
        <h2 className="mb-4 text-xl font-semibold">비활성화 상태</h2>
        <div className="flex flex-col gap-4">
          <Button disabled icon={<Heart />}>
            좋아요
          </Button>
          <Button disabled variant="default" icon={<MessageCircle />}>
            댓글 작성
          </Button>
          <Button disabled variant="outline" icon={<Share2 />}>
            공유하기
          </Button>
          <Button disabled variant="text" icon={<Star />}>
            즐겨찾기
          </Button>
        </div>
      </div>
      {/* 찜 버튼 */}
      <div className="space-y-4">
        <h2 className="mb-4 text-xl font-semibold">찜 버튼</h2>
        <LikeButton />
        <LikeButton />
        <LikeButton />
      </div>
      {/* 플로팅 버튼 섹션 */}
      <h2 className="mb-4 text-xl font-semibold">플로팅 버튼</h2>
      <FloatingButton icon={<ArrowUp />} className="bottom-24" />
      <FloatingButton variant="text" icon={<Plus />}>
        모임 만들기
      </FloatingButton>
      <FloatingButton
        icon={<Plus />}
        className="right-6 top-1/2 -translate-y-1/2" // 중간위치
      />
    </div>
  );
}

function LikeButton() {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = useCallback(() => {
    setIsLiked((prev) => !prev);
  }, []);

  return (
    <Button
      variant="text"
      size="sm"
      onClick={handleLikeClick}
      icon={<Heart className={isLiked ? 'fill-red-500 text-red-500' : ''} />}
    ></Button>
  );
}
