import ReviewAvgCard from '@/components/common/review/ReviewAvgCard';

const ReviewAvg = () => {
  const reviewData = {
    average: 4.7,
    count: {
      fives: 999,
      fours: 12,
      threes: 0,
      twos: 88,
      ones: 3,
    },
  };
  return <ReviewAvgCard count={reviewData.count} />;
};

export default ReviewAvg;
