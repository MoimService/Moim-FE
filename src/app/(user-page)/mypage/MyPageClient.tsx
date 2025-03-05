'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

// 컴포넌트 임포트
import BasicEdit from './_features/BasicEdit';
import BasicInfo from './_features/BasicInfo';
import ContactEdit from './_features/ContactEdit';
import ContactInfo from './_features/ContactInfo';
import PasswordEdit from './_features/PasswordEdit';
import PasswordInfo from './_features/PasswordInfo';
import TechStackEdit from './_features/TechStackEdit';
import TechStackInfo from './_features/TechStackInfo';

// 탭 타입 상수
const TAB_TYPES = {
  BASIC: 'basic',
  CONTACT: 'contact',
  TECH: 'tech',
  PASSWORD: 'password',
};

// 기본 내보내기 (모든 섹션을 관리하는 상위 컴포넌트)
const MyPageClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL에서 탭 값만 가져오기
  const tabFromUrl = searchParams.get('tab') || TAB_TYPES.BASIC;

  // 현재 활성화된 탭 상태 관리
  const [activeTab, setActiveTab] = useState(tabFromUrl);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  // 1. 편집 모드 상태 통합
  const [editModeSection, setEditModeSection] = useState<string | null>(null);

  // 3. 탭 참조 관리 최적화
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({
    [TAB_TYPES.BASIC]: null,
    [TAB_TYPES.CONTACT]: null,
    [TAB_TYPES.TECH]: null,
    [TAB_TYPES.PASSWORD]: null,
  });

  // URL 변경 감지 및 상태 업데이트 (중요: 뒤로가기/앞으로가기 처리)
  useEffect(() => {
    const currentTabFromUrl = searchParams.get('tab') || TAB_TYPES.BASIC;
    if (currentTabFromUrl !== activeTab) {
      setActiveTab(currentTabFromUrl);
    }
  }, [searchParams, activeTab]);

  // URL 업데이트 함수 - 탭 정보만 저장
  const updateUrl = useCallback(
    (tab: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('tab', tab);
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  // 탭 변경 핸들러
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    updateUrl(tab);
  };

  // 2. 편집 관련 핸들러 단순화
  const handleEditComplete = () => {
    setEditModeSection(null);
  };

  const handleEnableEdit = () => {
    setEditModeSection(activeTab);
  };

  // 탭 변경시 편집 모드 초기화
  useEffect(() => {
    setEditModeSection(null);
  }, [activeTab]);

  // 4. indicator 위치 업데이트 함수 최적화
  const updateIndicator = useCallback(() => {
    const currentTab =
      tabRefs.current[activeTab] || tabRefs.current[TAB_TYPES.BASIC];

    if (currentTab) {
      setIndicatorStyle({
        left: `${currentTab.offsetLeft}px`,
        width: `${currentTab.offsetWidth}px`,
      });
    }
  }, [activeTab]);

  // 활성 탭이 변경될 때 indicator 업데이트
  useEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  // 창 크기가 변경될 때 indicator 위치 조정
  useEffect(() => {
    const handleResize = () => {
      updateIndicator();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateIndicator]);

  // 5. 조건부 렌더링 최적화
  const renderContent = () => {
    const isEditMode = editModeSection === activeTab;

    switch (activeTab) {
      case TAB_TYPES.BASIC:
        return isEditMode ? (
          <BasicEdit onEditComplete={handleEditComplete} />
        ) : (
          <BasicInfo onEnableEdit={handleEnableEdit} />
        );
      case TAB_TYPES.CONTACT:
        return isEditMode ? (
          <ContactEdit onEditComplete={handleEditComplete} />
        ) : (
          <ContactInfo onEnableEdit={handleEnableEdit} />
        );
      case TAB_TYPES.TECH:
        return isEditMode ? (
          <TechStackEdit onEditComplete={handleEditComplete} />
        ) : (
          <TechStackInfo onEnableEdit={handleEnableEdit} />
        );
      case TAB_TYPES.PASSWORD:
        return isEditMode ? (
          <PasswordEdit onEditComplete={handleEditComplete} />
        ) : (
          <PasswordInfo onEnableEdit={handleEnableEdit} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="profile-manager flex flex-col">
      {/* 탭 네비게이션 */}
      <div className="tabs-container relative flex w-full md:mb-6">
        <button
          ref={(el) => {
            tabRefs.current[TAB_TYPES.BASIC] = el;
          }}
          className={`w-1/4 px-5 py-3 text-center font-medium transition-colors ${
            activeTab === TAB_TYPES.BASIC
              ? 'text-main'
              : 'text-Cgray500 hover:text-Cgray400'
          }`}
          onClick={() => handleTabChange(TAB_TYPES.BASIC)}
        >
          기본정보
        </button>
        <button
          ref={(el) => {
            tabRefs.current[TAB_TYPES.CONTACT] = el;
          }}
          className={`w-1/4 px-5 py-3 text-center font-medium transition-colors ${
            activeTab === TAB_TYPES.CONTACT
              ? 'text-main'
              : 'text-Cgray500 hover:text-Cgray400'
          }`}
          onClick={() => handleTabChange(TAB_TYPES.CONTACT)}
        >
          연락수단
        </button>
        <button
          ref={(el) => {
            tabRefs.current[TAB_TYPES.TECH] = el;
          }}
          className={`w-1/4 px-5 py-3 text-center font-medium transition-colors ${
            activeTab === TAB_TYPES.TECH
              ? 'text-main'
              : 'text-Cgray500 hover:text-Cgray400'
          }`}
          onClick={() => handleTabChange(TAB_TYPES.TECH)}
        >
          기술스택
        </button>
        <button
          ref={(el) => {
            tabRefs.current[TAB_TYPES.PASSWORD] = el;
          }}
          className={`w-1/4 px-5 py-3 text-center font-medium transition-colors ${
            activeTab === TAB_TYPES.PASSWORD
              ? 'text-main'
              : 'text-Cgray500 hover:text-Cgray400'
          }`}
          onClick={() => handleTabChange(TAB_TYPES.PASSWORD)}
        >
          비밀번호변경
        </button>

        {/* 애니메이션 underbar */}
        <div
          className="absolute bottom-0 h-1 bg-main transition-all duration-200 ease-in-out"
          style={indicatorStyle}
        />
      </div>

      {/* 활성화된 섹션만 렌더링 */}
      <div className="active-section mt-4">{renderContent()}</div>
    </div>
  );
};

export default MyPageClient;
