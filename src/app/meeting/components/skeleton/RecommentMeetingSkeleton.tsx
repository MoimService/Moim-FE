import SkeletonBasic from '@/components/ui/SkeletonBasic';

const RecommendMeetingSkeleton = () => {
  const skeletonCount = [1, 2, 3, 4];

  return (
    <div>
      <SkeletonBasic className="h-[41px] w-full" />
      <div className="mt-12 hidden overflow-hidden overflow-x-auto md:flex lg:flex">
        {skeletonCount.map((_, idx) => (
          <div key={idx} className="h-[410px] w-[335px] bg-BG p-4">
            <SkeletonBasic className="h-[252px] w-[303px] p-4" />
            <SkeletonBasic className="mt-2 h-[28px] w-[303px] p-4" />
            <SkeletonBasic className="mt-2 h-[24px] w-[303px]" />
            <SkeletonBasic className="mt-2 h-[20px] w-[303px]" />
          </div>
        ))}
      </div>
      <div className="mt-12 flex flex-col md:hidden lg:hidden">
        {skeletonCount.map((_, idx) => (
          <div key={idx} className="flex h-auto w-full bg-BG p-4">
            <SkeletonBasic className="h-[80px] w-[80px] p-4" />
            <div className="ml-2 h-full flex-1">
              <SkeletonBasic className="mt-2 h-[16px] w-auto flex-1" />
              <SkeletonBasic className="mt-2 h-[16px] w-auto flex-1" />
              <SkeletonBasic className="mt-2 h-[10px] w-auto flex-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendMeetingSkeleton;
