import SkeletonBasic from '@/components/ui/SkeletonBasic';

const SkeletonTechStackInfo = () => {
  return (
    <div className="rounded-lg border border-Cgray300 bg-Cgray200 p-4">
      <div className="mb-4 flex items-center justify-between">
        <SkeletonBasic className="h-[28px] w-[100px]" />
        <SkeletonBasic className="h-[20px] w-[40px]" />
      </div>

      <div className="flex flex-wrap gap-2">
        {/* 기술 스택 아이템들(보통 여러 개가 있으므로 여러 개 표시) */}
        <SkeletonBasic className="h-[28px] w-[80px] rounded-full" />
        <SkeletonBasic className="h-[28px] w-[100px] rounded-full" />
        <SkeletonBasic className="h-[28px] w-[70px] rounded-full" />
        <SkeletonBasic className="h-[28px] w-[90px] rounded-full" />
        <SkeletonBasic className="h-[28px] w-[60px] rounded-full" />
        <SkeletonBasic className="h-[28px] w-[110px] rounded-full" />
      </div>
    </div>
  );
};

export default SkeletonTechStackInfo;
