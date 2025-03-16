'use client';

import {
  QUERY_KEYS,
  prefetchProfileData,
} from '@/hooks/queries/useMyPageQueries';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import { TAB_TYPES } from '../../../constants/mypage/mypageConstant';
import {
  ACTIVE_SECTION,
  TAB_ACTIVE,
  TAB_BUTTON,
  TAB_CONTAINER,
  TAB_INACTIVE,
  TAB_INDICATOR,
} from '../../../constants/mypage/mypageCss';
// 컴포넌트 임포트
import BasicEdit from './_features/BasicEdit';
import BasicInfo from './_features/BasicInfo';
import ContactEdit from './_features/ContactEdit';
import ContactInfo from './_features/ContactInfo';
import PasswordEdit from './_features/PasswordEdit';
import PasswordInfo from './_features/PasswordInfo';
import TechStackEdit from './_features/TechStackEdit';
import TechStackInfo from './_features/TechStackInfo';

// 기본 내보내기 (모든 섹션을 관리하는 상위 컴포넌트)
const MyPageClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  // 데이터가 이미 있는지 확인
  const hasData = queryClient.getQueryData(QUERY_KEYS.profile());

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

  // 데이터가 없을 때만 prefetch (서버에서 가져오지 못한 경우의 백업)
  useEffect(() => {
    if (!hasData) {
      prefetchProfileData(queryClient);
    }
  }, [queryClient, hasData]);

  // URL 변경 감지 및 상태 업데이트 (중요: 뒤로가기/앞으로가기 처리)
  useEffect(() => {
    const currentTabFromUrl = searchParams.get('tab') || TAB_TYPES.BASIC;
    if (currentTabFromUrl !== activeTab) {
      setActiveTab(currentTabFromUrl);
    }
    // activeTab을 의존성에 포함하면 진동 현상이 발생하므로 의도적으로 제외
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

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
    // 탭 변경 전에 해당 탭에 필요한 데이터 prefetch
    prefetchProfileData(queryClient);

    setActiveTab(tab);
    updateUrl(tab);
  };

  // 2. 편집 관련 핸들러 단순화
  const handleEditComplete = () => {
    setEditModeSection(null);
  };

  const handleEnableEdit = () => {
    // 편집 모드로 전환하기 전에 프로필 데이터 다시 prefetch하여 최신 데이터 확보
    prefetchProfileData(queryClient);
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

  // 탭 버튼 클래스 생성 함수
  const getTabButtonClass = (tab: string) =>
    `${TAB_BUTTON} ${activeTab === tab ? TAB_ACTIVE : TAB_INACTIVE}`;

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
      <div className={TAB_CONTAINER}>
        <button
          ref={(el) => {
            tabRefs.current[TAB_TYPES.BASIC] = el;
          }}
          className={getTabButtonClass(TAB_TYPES.BASIC)}
          onClick={() => handleTabChange(TAB_TYPES.BASIC)}
        >
          기본정보
        </button>
        <button
          ref={(el) => {
            tabRefs.current[TAB_TYPES.CONTACT] = el;
          }}
          className={getTabButtonClass(TAB_TYPES.CONTACT)}
          onClick={() => handleTabChange(TAB_TYPES.CONTACT)}
        >
          연락수단
        </button>
        <button
          ref={(el) => {
            tabRefs.current[TAB_TYPES.TECH] = el;
          }}
          className={getTabButtonClass(TAB_TYPES.TECH)}
          onClick={() => handleTabChange(TAB_TYPES.TECH)}
        >
          기술스택
        </button>
        <button
          ref={(el) => {
            tabRefs.current[TAB_TYPES.PASSWORD] = el;
          }}
          className={getTabButtonClass(TAB_TYPES.PASSWORD)}
          onClick={() => handleTabChange(TAB_TYPES.PASSWORD)}
        >
          비밀번호변경
        </button>

        {/* 애니메이션 underbar */}
        <div className={TAB_INDICATOR} style={indicatorStyle} />
      </div>

      {/* 활성화된 섹션만 렌더링 */}
      <div className={ACTIVE_SECTION}>{renderContent()}</div>
    </div>
  );
};

export default MyPageClient;
