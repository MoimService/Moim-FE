import { Button } from '@/components/ui/Button';
import React from 'react';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  children: React.ReactNode;
  modalClassName?: string;
  contentClassName?: string;
  buttonClassName?: string;
  closeOnly?: boolean;
}

/**
 * Modal 컴포넌트는 사용자 인터페이스에 모달 다이얼로그를 표시하는 재사용 가능한 컴포넌트입니다.
 *
 * @component
 * @example
 * ```tsx
 * // 기본 모달 (확인/취소 버튼)
 * <Modal
 *   isOpen={true}
 *   onClose={() => setIsOpen(false)}
 *   onConfirm={() => handleConfirm()}
 *   confirmText="확인"
 *   cancelText="취소"
 *   modalClassName="w-96"
 * >
 *   <p>모달 내용</p>
 * </Modal>
 *
 * // 닫기 버튼만 있는 모달
 * <Modal
 *   isOpen={true}
 *   onClose={() => setIsOpen(false)}
 *   closeOnly
 *   cancelText="닫기"
 *   modalClassName="w-96"
 * >
 *   <p>모달 내용</p>
 * </Modal>
 * ```
 *
 * @param props - 모달 컴포넌트 프로퍼티
 * @param props.isOpen - 모달의 표시 여부를 제어
 * @param props.onClose - 모달이 닫힐 때 호출되는 콜백 함수
 * @param props.onConfirm - 확인 버튼 클릭 시 호출되는 콜백 함수 (closeOnly가 false일 때만 필요)
 * @param props.closeOnly - true일 경우 닫기 버튼만 표시 (기본값: false)
 * @param props.confirmText - 확인 버튼의 텍스트 (기본값: '확인', closeOnly가 false일 때만 사용)
 * @param props.cancelText - 취소/닫기 버튼의 텍스트 (기본값: closeOnly가 true일 때 '닫기', false일 때 '취소')
 * @param props.children - 모달 내부에 표시될 컨텐츠
 * @param props.modalClassName - 모달 컨테이너에 적용할 추가 클래스명
 * @param props.contentClassName - 모달 컨텐츠 영역에 적용할 추가 클래스명
 * @param props.buttonClassName - 버튼 영역에 적용할 추가 클래스명
 *
 * @returns React 컴포넌트
 */

const Modal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  confirmText = '확인',
  cancelText = '취소',
  children,
  modalClassName = '',
  contentClassName = '',
  buttonClassName = '',
  closeOnly = false,
}) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-BG_2 bg-opacity-50"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="presentation"
      aria-label="Close modal"
    >
      <div
        className={`rounded-lg bg-BG_2 shadow-xl ${modalClassName}`}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
      >
        <div className={`p-6 ${contentClassName}`}>{children}</div>

        <div className={`flex justify-end gap-2 p-4 ${buttonClassName}`}>
          {closeOnly ? (
            <Button onClick={onClose} type="button">
              {cancelText}
            </Button>
          ) : (
            <>
              <Button onClick={onClose} variant={'outline'} type="button">
                {cancelText}
              </Button>
              <Button onClick={onConfirm} type="button">
                {confirmText}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
