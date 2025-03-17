'use client';

import { useEffect, useState } from 'react';

/**
 * 화면이 1920px 이상인지 감지하는 커스텀 훅
 * @returns {boolean} 화면이 1920px 이상이면 true, 아니면 false
 */
export const useIsLargeScreen = () => {
  // 초기값은 false로 설정 (SSR 고려)
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    // 화면 크기 확인 함수
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1920);
    };

    // 초기 실행
    checkScreenSize();

    // 화면 크기 변경 이벤트 리스너
    window.addEventListener('resize', checkScreenSize);

    // 클린업
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return isLargeScreen;
};
