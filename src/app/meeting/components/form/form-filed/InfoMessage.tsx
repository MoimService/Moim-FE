import { Info } from 'lucide-react';
import React from 'react';

const InfoMessage = () => {
  return (
    <div className="flex items-start gap-3 rounded-md bg-Cgray100 p-4">
      <Info className="mt-0.5 size-5 flex-shrink-0 text-Cgray500" />
      <div>
        <p className="typo-body2 text-Cgray700">
          모임 생성 후 해당 페이지에서 수정 가능합니다.
        </p>
        <ul className="typo-caption1 mt-2 list-disc space-y-1 pl-5 text-Cgray500">
          <li>모임 규칙 및 공지사항</li>
          <li>모임 일정 및 장소 변경</li>
          <li>모임 공개 비공개 여부</li>
        </ul>
      </div>
    </div>
  );
};

export default InfoMessage;
