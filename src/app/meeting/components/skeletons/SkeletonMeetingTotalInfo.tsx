import SkeletonBasic from '../../../../components/ui/SkeletonBasic';

const SkeletonMeetingTotalInfo = () => {
  return (
    <>
      {/* 테스크탑 */}
      <div className=" hidden w-full flex-row gap-[40px] lg:flex">
        <SkeletonBasic className="h-[208px] flex-1" />
        <SkeletonBasic className="h-[208px] w-[318px]" />
      </div>
      {/* 태블릿 */}
      <div className="hidden w-full flex-col gap-[32px] md:flex lg:hidden">
        <SkeletonBasic className="h-[210px] w-full" />
        <SkeletonBasic className="h-[133px] w-full" />
      </div>
      {/* 모바일 */}
      <div className="mb-[16px] flex w-full flex-col gap-[16px] md:hidden">
        <SkeletonBasic className="h-[252px] w-full" />
        <SkeletonBasic className="h-[86px] w-full" />
        <SkeletonBasic className="h-[133px] w-full" />
      </div>
    </>
  );
};

export default SkeletonMeetingTotalInfo;
