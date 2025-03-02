import { useCallback, useRef } from 'react';

interface UseInfiniteScrollProps {
  fetchNextPage: () => void; // 다음 페이지를 불러오기 위한 함수
  isFetchingNextPage: boolean; // 현재 다음 페이지를 불러오는 중인지 여부
  hasNextPage: boolean; // 더 불러올 페이지가 존재하는지 여부
}

// IntersectionObserver를 사용하여 마지막 요소가 뷰포트에 들어올 때 fetchNextPage를 호출하는 훅
const useInfiniteScroll = ({
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
}: UseInfiniteScrollProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  // 연결된 DOM 요소가 뷰포트에 나타날 때 실행
  const lastElementRef = useCallback(
    (node: Element | null) => {
      if (isFetchingNextPage) return;

      // 기존에 생성된 observer가 있다면, 이전 관찰을 중단
      if (observerRef.current) observerRef.current.disconnect();

      // 새로운 IntersectionObserver를 생성
      observerRef.current = new IntersectionObserver((entries) => {
        // entries 배열의 첫 번째 항목이 뷰포트에 들어왔고,
        // 추가 페이지가 존재하면 fetchNextPage를 호출
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      // 연결된 노드가 있다면 observer를 사용해 해당 노드를 관찰
      if (node) observerRef.current.observe(node);
    },
    [fetchNextPage, isFetchingNextPage, hasNextPage],
  );

  return lastElementRef;
};

export default useInfiniteScroll;
