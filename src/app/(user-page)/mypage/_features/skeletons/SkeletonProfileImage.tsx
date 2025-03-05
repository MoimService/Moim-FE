import SkeletonBasic from '@/components/ui/SkeletonBasic';

const SkeletonProfileImage = () => {
  return (
    <div className="flex flex-col pt-[83px]">
      <SkeletonBasic className="h-[28px] w-[120px]" />
      <div className="flex justify-center gap-[24px] py-[24px]">
        <div className="relative">
          <SkeletonBasic className="h-[163px] w-[163px] rounded-[20px] md:h-[255px] md:w-[255px]" />
          <div className="absolute bottom-[15px] right-[15px]">
            <SkeletonBasic className="h-[34px] w-[34px] rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProfileImage;
