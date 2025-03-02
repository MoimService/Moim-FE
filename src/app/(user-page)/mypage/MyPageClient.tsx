'use client';

import { useState } from 'react';

// 컴포넌트 임포트
import BasicEdit from './components/BasicEdit';
import BasicInfo from './components/BasicInfo';
import ContactEdit from './components/ContactEdit';
import ContactInfo from './components/ContactInfo';
import PasswordEdit from './components/PasswordEdit';
import PasswordInfo from './components/PasswordInfo';
import TechStackEdit from './components/TechStackEdit';
import TechStackInfo from './components/TechStackInfo';

// 기본 내보내기 (모든 섹션을 관리하는 상위 컴포넌트)
const MyPageClient = () => {
  // 각 섹션별 편집 모드 상태 관리
  const [isBasicEditMode, setIsBasicEditMode] = useState(false);
  const [isContactEditMode, setIsContactEditMode] = useState(false);
  const [isTechEditMode, setIsTechEditMode] = useState(false);
  const [isPasswordEditMode, setIsPasswordEditMode] = useState(false);

  return (
    <div className="profile-manager flex flex-col gap-[56px]">
      {/* 기본 정보 섹션 */}
      {isBasicEditMode ? (
        <BasicEdit onEditComplete={() => setIsBasicEditMode(false)} />
      ) : (
        <BasicInfo onEnableEdit={() => setIsBasicEditMode(true)} />
      )}

      {/* 연락처 정보 섹션 */}
      {isContactEditMode ? (
        <ContactEdit onEditComplete={() => setIsContactEditMode(false)} />
      ) : (
        <ContactInfo onEnableEdit={() => setIsContactEditMode(true)} />
      )}

      {/* 기술 스택 섹션 */}
      {isTechEditMode ? (
        <TechStackEdit onEditComplete={() => setIsTechEditMode(false)} />
      ) : (
        <TechStackInfo onEnableEdit={() => setIsTechEditMode(true)} />
      )}

      {/* 비밀번호 섹션 */}
      {isPasswordEditMode ? (
        <PasswordEdit onEditComplete={() => setIsPasswordEditMode(false)} />
      ) : (
        <PasswordInfo onEnableEdit={() => setIsPasswordEditMode(true)} />
      )}
    </div>
  );
};

export default MyPageClient;
