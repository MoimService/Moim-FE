import SkeletonBasic from '@/components/ui/SkeletonBasic';

const MeetingListSkeleton = () => {
  const skeletonCount = [1, 2, 3, 4];

  return (
    <div className="relative mt-[126px] px-4">
      <div className="flex flex-col items-center">
        <SkeletonBasic className="mb-10 h-[47px] w-full sm:w-11/12" />
        <SkeletonBasic className="h-[47px] w-full sm:w-11/12" />
        {/* 기술스택 */}
        <SkeletonBasic className="mt-8 h-[250px] sm:w-11/12 md:right-4 md:w-full" />
      </div>

      <div className="mx-8 mt-6 flex h-[40px] w-11/12 items-center">
        <SkeletonBasic className=" w-full md:absolute md:right-3 md:h-[47px] md:w-[122px]" />
      </div>
      <div className="mt-5 hidden flex-col md:hidden lg:flex">
        {skeletonCount.map((_, idx) => (
          <div key={idx} className="flex h-auto w-full bg-BG py-4">
            <SkeletonBasic className="h-[208px] w-[252px] p-4" />
            <div className="ml-2 flex w-[738px] flex-col px-[30px] py-6">
              <SkeletonBasic className="mt-2 h-[50px] w-auto flex-1" />
              <SkeletonBasic className="mt-2 h-[16px] w-auto flex-1" />
              <SkeletonBasic className="mt-2 h-[10px] w-auto flex-1" />
            </div>
            <div className="relative ml-2 h-full flex-1">
              <SkeletonBasic className="absolute right-0 h-[30px] w-[30px] flex-1" />
              <SkeletonBasic className="mt-12 h-[60px] w-auto flex-1" />
              <SkeletonBasic className="mt-2 h-[46px] w-auto flex-1" />
            </div>
          </div>
        ))}
      </div>
      {/* 테블릿 */}
      <div className="mt-20 hidden flex-col md:flex lg:hidden">
        {skeletonCount.map((_, idx) => (
          <div key={idx} className="flex h-auto w-full bg-BG py-4">
            <SkeletonBasic className="h-[208px] w-[252px] p-4" />
            <div className="ml-2 flex w-full flex-1 flex-col px-[20px] py-6">
              <SkeletonBasic className="mt-2 h-[50px] w-auto flex-1" />
              <SkeletonBasic className="mt-2 h-[16px] w-auto flex-1" />
              <SkeletonBasic className="mt-2 h-[10px] w-auto flex-1" />
            </div>
            <div className="relative ml-2 h-full w-[180px]">
              <SkeletonBasic className="absolute right-0 h-[30px] w-[30px] flex-1" />
              <SkeletonBasic className="mt-10 h-[120px] w-auto flex-1" />
              <SkeletonBasic className="mt-2 h-[40px] w-auto flex-1" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:mt-5 md:mt-20  md:hidden lg:hidden">
        {skeletonCount.map((_, idx) => (
          <div
            key={idx}
            className="relative flex h-auto w-full flex-col items-center bg-BG py-4"
          >
            <SkeletonBasic className="h-[160px] w-[310px]" />
            <div className="h-full w-[310px]">
              <SkeletonBasic className="mt-3 h-[30px] w-auto flex-1" />
              <SkeletonBasic className="mb-10 mt-4 h-[130px] w-auto flex-1" />
              <SkeletonBasic className="mt-5 h-[40px] w-auto flex-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetingListSkeleton;
