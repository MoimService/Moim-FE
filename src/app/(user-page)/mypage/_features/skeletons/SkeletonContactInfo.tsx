import SkeletonBasic from '@/components/ui/SkeletonBasic';

const SkeletonContactInfo = () => {
  return (
    <div className="mb-6 w-full rounded-[16px] border border-Cgray300 p-[32px]">
      <div className="flex flex-col gap-[32px]">
        {/* 전화번호 */}
        <div className="flex flex-col gap-[8px]">
          <SkeletonBasic className="h-[28px] w-[100px]" />
          <SkeletonBasic className="h-[50px] w-full" />
        </div>

        {/* 카카오톡 ID */}
        <div className="flex flex-col gap-[8px]">
          <SkeletonBasic className="h-[28px] w-[100px]" />
          <SkeletonBasic className="h-[50px] w-full" />
        </div>

        {/* 깃허브 */}
        <div className="flex flex-col gap-[8px]">
          <SkeletonBasic className="h-[28px] w-[100px]" />
          <SkeletonBasic className="h-[50px] w-full" />
        </div>

        {/* 블로그 */}
        <div className="flex flex-col gap-[8px]">
          <SkeletonBasic className="h-[28px] w-[100px]" />
          <SkeletonBasic className="h-[50px] w-full" />
        </div>

        {/* 버튼 */}
        <div className="flex justify-center md:justify-start">
          <SkeletonBasic className="h-[40px] w-[295px] md:h-[46px] md:w-[280px]" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonContactInfo;
