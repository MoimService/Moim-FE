import { Button } from '@/components/ui/Button';

interface SubmitButtonProps {
  isLoading?: boolean;
  text?: string;
  loadingText?: string;
  className?: string;
}

const SubmitButton = ({
  isLoading = false,
  text = '모임 생성하기',
  loadingText = '처리 중...',
  className = 'w-full',
}: SubmitButtonProps) => {
  return (
    <Button type="submit" className={className} disabled={isLoading}>
      {isLoading ? loadingText : text}
    </Button>
  );
};

export default SubmitButton;
