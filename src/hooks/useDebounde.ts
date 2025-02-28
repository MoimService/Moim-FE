import { useEffect } from 'react';

/**
 * 특정 값이 변경된 후 지정된 시간이 지나면 콜백 함수를 실행하는 Debounce 훅
 *
 * @param {T} value - 감지할 값
 * @param {number} delay - 딜레이(ms) (기본값: 1000ms)
 * @param {Function} callback - 딜레이 후 실행할 콜백 함수
 */
const useDebounce = <T>({
  value,
  delay = 1000,
  callBack,
}: {
  value: T;
  delay?: number;
  callBack?: () => void;
}) => {
  useEffect(() => {
    if (value === null || value === undefined) return;
    const timer = setTimeout(() => {
      if (callBack) {
        callBack();
      }
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay, callBack]);
};
export default useDebounce;
