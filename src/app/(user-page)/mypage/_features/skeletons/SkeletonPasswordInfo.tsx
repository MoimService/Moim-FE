import SkeletonBasic from '@/components/ui/SkeletonBasic';

const SkeletonPasswordInfo = () => {
  return (
    <div className="w-full rounded-[16px] border border-Cgray300 p-[32px]">
      <div className="flex flex-col gap-[32px]">
        <div className="flex flex-col gap-[8px]">
          <SkeletonBasic className="h-[28px] w-[100px]" />
        </div>

        <div className="flex justify-center md:justify-start">
          <SkeletonBasic className="h-[40px] w-[295px] md:h-[46px] md:w-[280px]" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonPasswordInfo;
