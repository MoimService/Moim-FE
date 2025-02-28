'use client';

import ReviewAvgCard from '@/components/common/review/ReviewAvgCard';
import { Progress } from '@/components/ui/Progress';
import React from 'react';

export default function ProgressExamples() {
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
  return (
    <div className="mt-3 flex h-screen flex-col bg-BG p-8">
      <Progress className="w-40" total={50} value={33} showCounter={true} />
      <Progress total={100} value={70} showCounter={true} />
      <ReviewAvgCard count={reviewData.count} />
    </div>
  );
}
