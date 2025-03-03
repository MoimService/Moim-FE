'use client';

import { FloatingButton } from '@/components/ui/FloatingButton';
import { ArrowUp, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const FloatingButtonGroup = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const router = useRouter();
  const MoveToCreateMeetingPage = () => {
    // TODO: 모임 생성 페이지로 이동
    router.push('/meeting/create-meeting');
  };

  return (
    <>
      <FloatingButton
        onClick={handleScrollToTop}
        icon={<ArrowUp className="stroke-main" />}
        className="bottom-24 z-10 bg-solid"
      />
      {/* 웹 노출 */}
      <FloatingButton
        onClick={MoveToCreateMeetingPage}
        className="z-10 hidden md:flex"
        icon={<Plus />}
      />
      {/* 테블릿, 모바일 노출 노출 */}
      <FloatingButton
        onClick={MoveToCreateMeetingPage}
        className="z-10 flex md:hidden"
        variant="text"
        icon={<Plus />}
      >
        모임 만들기
      </FloatingButton>
    </>
  );
};

export default FloatingButtonGroup;
