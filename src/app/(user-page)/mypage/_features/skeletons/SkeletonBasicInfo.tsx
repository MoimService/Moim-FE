import SkeletonBasic from '@/components/ui/SkeletonBasic';

const SkeletonBasicInfo = () => {
  return (
    <div className="mb-6 w-full rounded-[16px] border border-Cgray300 p-[32px]">
      <div className="flex flex-col gap-[32px]">
        {/* 이름 */}
        <div className="flex flex-col gap-[8px]">
          <SkeletonBasic className="h-[28px] w-[100px]" />
          <SkeletonBasic className="h-[50px] w-full" />
        </div>

        {/* 소개글 */}
        <div className="flex flex-col gap-[8px]">
          <SkeletonBasic className="h-[28px] w-[100px]" />
          <SkeletonBasic className="h-[140px] w-full" />
        </div>

        {/* 포지션 */}
        <div className="flex flex-col gap-[8px]">
          <SkeletonBasic className="h-[28px] w-[100px]" />
          <SkeletonBasic className="h-[50px] w-full" />
        </div>

        {/* 성별 */}
        <div className="flex flex-col gap-[8px]">
          <SkeletonBasic className="h-[28px] w-[100px]" />
          <SkeletonBasic className="h-[50px] w-full" />
        </div>

        {/* 연령대 */}
        <div className="flex flex-col gap-[8px]">
          <SkeletonBasic className="h-[28px] w-[100px]" />
          <SkeletonBasic className="h-[50px] w-full" />
        </div>

        {/* 지역 */}
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

export default SkeletonBasicInfo;
