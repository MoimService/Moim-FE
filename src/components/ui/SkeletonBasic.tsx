import { cn } from '@/util/cn';

const SkeletonBasic = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'animate-pulse h-[20px] w-[100px] rounded-[8px] bg-Cgray200',
        className,
      )}
    />
  );
};

export default SkeletonBasic;
