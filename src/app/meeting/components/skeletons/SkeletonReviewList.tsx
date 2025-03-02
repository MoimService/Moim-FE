import SkeletonReviewItem from './SkeletonReviewItem';

const SkeletonReviewList = () => {
  return (
    <div className="flex flex-col gap-[8px]">
      <div>
        <SkeletonReviewItem />
        <div className="mx-[24px] h-[1px] bg-Cgray300" />
      </div>
      <div>
        <SkeletonReviewItem />
        <div className="mx-[24px] h-[1px] bg-Cgray300" />
      </div>
      <div>
        <SkeletonReviewItem />
        <div className="mx-[24px] h-[1px] bg-Cgray300" />
      </div>
    </div>
  );
};

export default SkeletonReviewList;
