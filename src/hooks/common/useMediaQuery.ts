import { useEffect, useState } from 'react';

// 브라우저의 width에 따라 'mobile', 'tablet', 'desktop'을 판별하는 훅
const useMediaQuery = () => {
  const [breakpoint, setBreakpoint] = useState<'mobile' | 'tablet' | 'desktop'>(
    'desktop',
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 376) {
        setBreakpoint('mobile');
      } else if (width < 745) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('desktop');
      }
    };

    handleResize(); // 초기 체크
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
};

export default useMediaQuery;
