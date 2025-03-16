const SkeletonUserInfo = () => {
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="animate-pulse flex h-[80px] w-[200px] flex-col gap-[16px] rounded-[8px] bg-Cgray200 sm:w-[400px]" />
      <div className="flex flex-col gap-[8px] px-[8px]">
        <div className="animate-pulse flex h-[20px] w-[200px] gap-[8px] rounded-[8px] bg-Cgray200" />
        <div className="animate-pulse flex h-[20px] w-[200px] gap-[8px] rounded-[8px] bg-Cgray200" />
      </div>
      <div className="ml-[8px] flex gap-[6px] text-Cgray500">
        <div className="animate-pulse flex h-[24px] w-[82px] rounded-[8px] bg-Cgray200" />
        <div className="animate-pulse flex h-[24px] w-[82px] rounded-[8px] bg-Cgray200" />
        <div className="animate-pulse flex h-[24px] w-[82px] rounded-[8px] bg-Cgray200" />
        <div className="animate-pulse flex h-[24px] w-[82px] rounded-[8px] bg-Cgray200" />
        <div className="animate-pulse flex h-[24px] w-[82px] rounded-[8px] bg-Cgray200" />
      </div>
    </div>
  );
};

export default SkeletonUserInfo;
