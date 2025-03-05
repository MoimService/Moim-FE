import SkeletonBasic from '@/components/ui/SkeletonBasic';

const MeetingListSkeleton = () => {
  const skeletonCount = [1, 2, 3, 4];

  return (
    <div className="relative p-4">
      <SkeletonBasic className="h-[47px] w-full" />
      <SkeletonBasic className="mt-3 h-[40px] w-full md:absolute md:right-4 md:h-[47px] md:w-[122px]" />
      <div className="mt-20 hidden flex-col md:hidden lg:flex">
        {skeletonCount.map((_, idx) => (
          <div key={idx} className="flex h-auto w-full bg-BG py-4">
            <SkeletonBasic className="h-[252px] w-[303px] p-4" />
            <div className="ml-2 h-full flex-1 px-[40px]">
              <SkeletonBasic className="mt-2 h-[50px] w-auto flex-1" />
              <SkeletonBasic className="mt-2 h-[16px] w-auto flex-1" />
              <SkeletonBasic className="mt-2 h-[10px] w-auto flex-1" />
            </div>
            <div className="relative ml-2 h-full flex-1">
              <SkeletonBasic className="absolute right-0 h-[30px] w-[30px] flex-1" />
              <SkeletonBasic className="mt-12 h-[120px] w-auto flex-1" />
              <SkeletonBasic className="mt-2 h-[46px] w-auto flex-1" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-20 hidden flex-col md:flex lg:hidden">
        {skeletonCount.map((_, idx) => (
          <div key={idx} className="flex h-auto w-full bg-BG py-4">
            <SkeletonBasic className="h-[160px] w-[160px] p-4" />
            <div className="ml-2 h-full flex-1 px-[20px]">
              <SkeletonBasic className="mt-2 h-[50px] w-auto flex-1" />
              <SkeletonBasic className="mt-2 h-[16px] w-auto flex-1" />
              <SkeletonBasic className="mt-2 h-[10px] w-auto flex-1" />
            </div>
            <div className="relative ml-2 h-full w-[180px]">
              <SkeletonBasic className="absolute right-0 h-[30px] w-[30px] flex-1" />
              <SkeletonBasic className="mt-10 h-[60px] w-auto flex-1" />
              <SkeletonBasic className="mt-2 h-[40px] w-auto flex-1" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-20 flex flex-col md:hidden lg:hidden">
        {skeletonCount.map((_, idx) => (
          <div key={idx} className="h-auto w-full flex-col bg-BG py-4">
            <SkeletonBasic className="h-[160px] w-full" />
            <div className="h-full flex-1">
              <SkeletonBasic className="mt-2 h-[30px] w-auto flex-1" />
              <SkeletonBasic className="mt-2 h-[16px] w-auto flex-1" />
              <SkeletonBasic className="mt-5 h-[40px] w-auto flex-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetingListSkeleton;
