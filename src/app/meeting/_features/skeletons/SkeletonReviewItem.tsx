import RatingStars from '@/components/common/review/RatingStars';
import SkeletonBasic from '@/components/ui/SkeletonBasic';

const SkeletonReviewItem = () => {
  return (
    <div className="flex flex-col gap-[16px] p-[24px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[8px]">
          <SkeletonBasic className="h-[40px] w-[40px] rounded-[9.92px]" />{' '}
          {/* 프로필 */}
          <SkeletonBasic className="w-[100px]" /> {/* 이름 */}
        </div>
        <RatingStars rating={Number(0)} size={24} />
      </div>
      <div className="flex h-[100px] flex-col gap-[16px]">
        <SkeletonBasic className="w-[200px]" /> {/* 댓글 내용 */}
        <SkeletonBasic className="w-[300px]" /> {/* 댓글 내용 */}
      </div>
      <div className="flex justify-end">
        <SkeletonBasic className="w-[50px]" /> {/* 날짜 */}
      </div>
    </div>
  );
};

export default SkeletonReviewItem;
