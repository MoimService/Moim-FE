import { useEffect, useRef, useState } from 'react';
import { ClickedButtonsState } from 'types/techStack';

interface UseTechSelectionProps {
  maxSelections?: number;
  initialSelection?: ClickedButtonsState;
  onSelectionChange?: (selection: string[]) => void;
}

const useTechSelection = ({
  maxSelections = 5,
  initialSelection = {},
  onSelectionChange,
}: UseTechSelectionProps = {}) => {
  const [clickedButtons, setClickedButtons] =
    useState<ClickedButtonsState>(initialSelection);

  // 이전 선택 값을 저장하기 위한 ref
  const prevSelectionRef = useRef<string[]>([]);

  // 선택된 아이콘 이름 목록 가져오기
  const getSelectedIconNames = (): string[] => {
    return Object.entries(clickedButtons)
      .filter(([, isClicked]) => isClicked)
      .map(([name]) => name);
  };

  const selectedNames = getSelectedIconNames();
  const selectedCount = selectedNames.length;

  // 외부 콜백을 useEffect 내에서 호출하되, 선택 값이 실제로 변경됐을 때만 호출
  useEffect(() => {
    // 현재 선택과 이전 선택을 비교
    const currentSelection = selectedNames;
    const prevSelection = prevSelectionRef.current;

    // 선택이 변경되었는지 확인 (길이 또는 내용이 다른 경우)
    const hasSelectionChanged =
      currentSelection.length !== prevSelection.length ||
      currentSelection.some((name) => !prevSelection.includes(name));

    // 변경된 경우에만 콜백 호출
    if (hasSelectionChanged && onSelectionChange) {
      onSelectionChange(currentSelection);
      // 현재 선택을 이전 선택으로 업데이트
      prevSelectionRef.current = [...currentSelection];
    }
  }, [selectedNames, onSelectionChange]);

  // 컴포넌트 마운트 시 초기 선택 상태 설정
  useEffect(() => {
    prevSelectionRef.current = selectedNames;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 버튼 클릭 핸들러
  const handleButtonClick = (iconName: string): void => {
    setClickedButtons((prev) => {
      // 이미 선택된 상태라면 선택 해제
      if (prev[iconName]) {
        const newState = { ...prev };
        delete newState[iconName];
        return newState;
      }

      // 현재 선택된 항목 개수 확인
      const selectedCount = Object.values(prev).filter(Boolean).length;

      // 최대 선택 개수를 초과하는 경우 추가하지 않음
      if (selectedCount >= maxSelections) {
        return prev;
      }

      // 최대 개수 이내라면 추가
      return {
        ...prev,
        [iconName]: true,
      };
    });
  };

  // 초기화 버튼 핸들러
  const handleReset = (): void => {
    setClickedButtons({});
  };

  // 개별 선택 해제 핸들러
  const handleRemoveSelection = (iconName: string): void => {
    setClickedButtons((prev) => {
      const newState = { ...prev };
      delete newState[iconName];
      return newState;
    });
  };

  return {
    clickedButtons,
    selectedCount,
    selectedNames,
    handleButtonClick,
    handleReset,
    handleRemoveSelection,
    setClickedButtons,
  };
};

export default useTechSelection;
