import { Progress } from '@/components/ui/Progress';
import React from 'react';

import RatingStars from './RatingStars';

interface ReviewAvgCardProps {
  count: {
    fives: number;
    fours: number;
    threes: number;
    twos: number;
    ones: number;
  };
}

const ReviewAvgCard = ({ count }: ReviewAvgCardProps) => {
  const total = Object.values(count).reduce((acc, curr) => acc + curr, 0);

  const average =
    total > 0
      ? (
          (count.fives * 5 +
            count.fours * 4 +
            count.threes * 3 +
            count.twos * 2 +
            count.ones * 1) /
          total
        ).toFixed(1)
      : '0.0';

  const ratingBars = [
    { score: 5, value: count.fives },
    { score: 4, value: count.fours },
    { score: 3, value: count.threes },
    { score: 2, value: count.twos },
    { score: 1, value: count.ones },
  ];

  return (
    <div className="w-full rounded-[24px] bg-Cgray200 p-8">
      <div className="flex h-full w-full flex-col gap-8 lg:flex-row">
        <div className="flex flex-col items-center justify-center gap-4 lg:w-1/2">
          <div className="typo-head1 flex items-center justify-center gap-1">
            <span className="text-Cgray800">{average}</span>
            <span className="text-Cgray500">/ 5</span>
          </div>
          <RatingStars rating={Number(average)} size={40} />
        </div>
        <div className="flex flex-col gap-2 lg:w-1/2">
          {ratingBars.map(({ score, value }) => (
            <div key={score} className="flex w-full items-center">
              <p className="w-10 text-sm text-Cgray500">{score}점</p>
              <div className="mx-2 flex-1">
                <Progress value={value} total={total} showCounter={false} />
              </div>
              <p className="w-10 text-right text-sm text-Cgray500">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewAvgCard;
