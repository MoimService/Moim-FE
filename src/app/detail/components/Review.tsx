import ReviewAvg from './ReviewAvg';
import ReviewInput from './ReviewInput';
import ReviewList from './ReviewList';

const Review = () => {
  return (
    <div className="flex flex-col gap-[48px] px-[48px] py-[16px]">
      <ReviewAvg />
      <ReviewInput />
      <ReviewList />
    </div>
  );
};

export default Review;
