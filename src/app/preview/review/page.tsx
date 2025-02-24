import StarIcon from '@/assets/icon/Star';
import React from 'react';

export default function page() {
  return (
    <div className="h-screen bg-Cgray100">
      <div className="flex gap-2">
        <StarIcon variant="outline" />
        <StarIcon variant="filled" />
        <StarIcon variant="half" />
        <StarIcon variant="filled" size={12} />
      </div>
      <div
        title="hello"
        className="bg-balck flex flex-col items-center text-black"
      ></div>
    </div>
  );
}
