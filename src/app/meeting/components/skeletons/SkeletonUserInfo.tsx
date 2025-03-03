const SkeletonUserInfo = () => {
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex h-[80px] w-[200px] animate-pulse flex-col gap-[16px] rounded-[8px] bg-Cgray200 sm:w-[400px]" />
      <div className="flex flex-col gap-[8px] px-[8px]">
        <div className="flex h-[20px] w-[200px] animate-pulse gap-[8px] rounded-[8px] bg-Cgray200" />
        <div className="flex h-[20px] w-[200px] animate-pulse gap-[8px] rounded-[8px] bg-Cgray200" />
      </div>
      <div className="ml-[8px] flex gap-[6px] text-Cgray500">
        <div className="flex h-[24px] w-[82px] animate-pulse rounded-[8px] bg-Cgray200" />
        <div className="flex h-[24px] w-[82px] animate-pulse rounded-[8px] bg-Cgray200" />
        <div className="flex h-[24px] w-[82px] animate-pulse rounded-[8px] bg-Cgray200" />
        <div className="flex h-[24px] w-[82px] animate-pulse rounded-[8px] bg-Cgray200" />
        <div className="flex h-[24px] w-[82px] animate-pulse rounded-[8px] bg-Cgray200" />
      </div>
    </div>
  );
};

export default SkeletonUserInfo;
