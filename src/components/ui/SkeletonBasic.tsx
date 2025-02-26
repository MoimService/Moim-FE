import { cn } from '@/util/cn';

const SkeletonBasic = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'h-[20px] w-[100px] animate-pulse rounded-[8px] bg-Cgray200',
        className,
      )}
    />
  );
};

export default SkeletonBasic;
