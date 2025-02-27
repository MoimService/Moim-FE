'use client';

import TechSelector from '@/components/ui/tech-stack/TechSelector';
import React, { useState } from 'react';

export default function Page(): JSX.Element {
  // 상위 컴포넌트에서 선택된 기술 목록 관리
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  // 기술 선택 변경 핸들러
  const handleSelectionChange = (selection: string[]) => {
    setSelectedTechs(selection);
    console.log('Selected technologies:', selection);

    // 여기서 필요한 상태 업데이트 또는 API 호출 등을 수행할 수 있습니다.
    // 예: 선택된 기술 정보를 서버에 전송
  };

  return (
    <div>
      <TechSelector
        maxSelections={5}
        onSelectionChange={handleSelectionChange}
      />
    </div>
  );
}
