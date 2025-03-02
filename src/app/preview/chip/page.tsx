'use client';

import Chip from '@/components/ui/Chip';
import React, { useState } from 'react';

export default function ChipPreview() {
  const [position, setPosition] = useState('');

  return (
    <div className="bg-gray-50 flex flex-col gap-8 p-8 pb-32">
      <Chip>All</Chip>
      <Chip isActive>All</Chip>
      <div className="w-[544px] p-[40px]">
        <div className="flex w-full">
          <Chip
            className={`flex-1 hover:cursor-pointer`}
            isActive={position === 'Frontend'}
            onClick={() => setPosition('Frontend')}
          >
            프론트엔드
          </Chip>
          <Chip
            className={`flex-1 hover:cursor-pointer`}
            isActive={position === 'Backend'}
            onClick={() => setPosition('Backend')}
          >
            백엔드
          </Chip>
          <Chip
            className={`flex-1 hover:cursor-pointer`}
            isActive={position === 'Designer'}
            onClick={() => setPosition('Designer')}
          >
            디자이너
          </Chip>
        </div>
      </div>
    </div>
  );
}
