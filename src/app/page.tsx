'use client';

import Section1Image from '@/assets/images/section1.png';
import Section2Image from '@/assets/images/section2.png';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';

import DevingLogo from '../assets/icon/devingLogo.svg';
import GithubIcon from '../assets/icon/github_icon.svg';
import LandingLogo from '../assets/icon/landing_logo.svg';
import MediumCheckIcon from '../assets/icon/medium_check_icon.svg';
import NotionIcon from '../assets/icon/notion_icon.svg';
import SmallCheckIcon from '../assets/icon/small_check_Icon.svg';

// 타입 정의 - 라이브러리에서 필요한 속성 정확하게 지정
interface FullPageProps {
  credits: {
    enabled: boolean;
    position?: 'left' | 'right';
    label?: string;
  };
  scrollingSpeed: number;
  navigation: boolean;
  navigationPosition: string;
  responsiveWidth?: number;
  scrollOverflow: boolean;
  licenseKey: string;
  afterLoad: (destination: { index: number }) => void;
  touchSensitivity: number;
  bigSectionsDestination: 'top' | 'bottom' | null;
  render: (props: { fullpageApi?: unknown }) => JSX.Element;
}

// 클라이언트 사이드에서만 ReactFullpage 로드
const FullPage = dynamic(
  () => import('@fullpage/react-fullpage').then((mod) => mod.default),
  { ssr: false },
);

const FullPageWrapper = dynamic(
  () => import('@fullpage/react-fullpage').then((mod) => mod.default.Wrapper),
  { ssr: false },
);

// 애니메이션 설정을 객체로 분리하여 관리
const animations = {
  fadeInUp: {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  },
  popIn: {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 10,
      },
    },
  },
  imageAnimation: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  },
};

// 언마운트 오류를 방지하기 위한 래퍼 컴포넌트
const SafeFullPage: React.FC<FullPageProps> = (props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // 콘솔 경고 필터링을 위한 원본 콘솔 참조 저장
    const originalConsoleError = console.error;

    // fullPage 라이센스 경고 필터링 함수
    const filterConsoleError = (...args: Parameters<typeof console.error>) => {
      if (
        typeof args[0] === 'string' &&
        (args[0].includes('fullPage:') ||
          args[0].includes('licenseKey') ||
          args[0].includes('alvarotrigo'))
      ) {
        return; // fullPage 라이센스 메시지 무시
      }
      originalConsoleError(...args);
    };

    // 콘솔 오류 필터링 적용
    console.error = filterConsoleError;

    // 스타일 요소 생성 및 적용
    const style = document.createElement('style');
    style.innerHTML = `
      .fp-watermark, #fp-nav ul li .fp-tooltip, .fp-warning {
        display: none !important;
      }

      /* 첫 번째 섹션 스크롤 제거 */
      #fp-nav + .fp-section:first-of-type {
        overflow: hidden !important;
      } 
      
      /* fp-auto-height 섹션이 올바르게 표시되도록 스타일 조정 */
      .fp-auto-height.fp-section {
        height: auto !important;
      }
      
      .fp-auto-height .fp-tableCell {
        height: auto !important;
        padding-bottom: 0 !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      setMounted(false);
      // 원래의 console.error 복원
      console.error = originalConsoleError;

      // 언마운트 전에 정리를 위한 지연
      setTimeout(() => {
        const fpNav = document.querySelector('#fp-nav');
        if (fpNav) fpNav.remove();

        const sections = document.querySelectorAll('.section');
        sections.forEach((section) => {
          section.classList.remove('active', 'fp-section', 'fp-table');
        });

        if (document.head.contains(style)) {
          document.head.removeChild(style);
        }
      }, 0);
    };
  }, []);

  if (!mounted) return null;

  return <FullPage {...props} />;
};

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // 모바일 감지 함수를 useCallback으로 최적화
  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // afterLoad 핸들러를 useCallback으로 최적화
  const handleAfterLoad = useCallback(
    (destination: { index: number }): void => {
      setCurrentSection(destination.index);
    },
    [],
  );

  // 동적 모듈 사전 로드 함수
  const preloadModules = useCallback(async () => {
    try {
      await import('@fullpage/react-fullpage');
      // console.log 대신 주석으로 처리
      // console.log('FullPage 모듈 로드 성공');
    } catch (error) {
      console.error('FullPage 모듈 로드 실패:', error);
    }
  }, []);

  useEffect(() => {
    // 컴포넌트 마운트 즉시 상태 변경
    setIsClient(true);

    // 초기 모바일 체크
    checkMobile();

    // 리사이즈 이벤트에 대응
    window.addEventListener('resize', checkMobile);

    // 모듈 사전 로드
    preloadModules();

    return () => {
      // 이벤트 리스너 정리
      window.removeEventListener('resize', checkMobile);
    };
  }, [checkMobile, preloadModules]);

  // 로딩 상태일 때 표시될 컴포넌트
  if (!isClient) {
    return (
      <div
        className="flex h-screen items-center justify-center text-white"
        role="status"
      >
        <span className="sr-only">로딩 중...</span>
        Loading...
      </div>
    );
  }

  return (
    <SafeFullPage
      credits={{
        enabled: true, // 프로덕션에서는 라이센스 구매 필요
        position: 'right',
      }}
      scrollingSpeed={1000}
      navigation={true}
      navigationPosition={'right'}
      touchSensitivity={50}
      bigSectionsDestination="top"
      scrollOverflow={false}
      licenseKey={'YOUR_LICENSE_KEY'} // 프로덕션 환경에서는 라이센스 키 구매 및 입력 필요
      afterLoad={handleAfterLoad}
      render={() => {
        return (
          <FullPageWrapper>
            <div className="section">
              {/* 메인 히어로 섹션 */}
              <main className="md:h-[1085px] lg:h-[1168px] lg:pt-[83px]">
                <motion.h1
                  className="flex justify-center overflow-hidden whitespace-nowrap pt-[140px] text-center text-[32px] font-semibold leading-[41px] text-solid md:pt-[151px] md:text-[56px] md:leading-[90px] lg:pt-[100px] lg:text-[72px] lg:leading-[90px]"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={animations.staggerContainer}
                >
                  <motion.span variants={animations.fadeInUp}>
                    개발자와 디자이너의 공간,
                    <br />
                    Deving에서 함께해요!
                  </motion.span>
                </motion.h1>
                <motion.div
                  className="flex justify-center py-[60px] md:px-[48px] md:pb-[102px] md:pt-[124px] lg:px-[115px] lg:pb-[76px] lg:pt-[124px]"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={animations.imageAnimation}
                >
                  <div className="h-[450px] w-full"></div>
                </motion.div>
              </main>
            </div>

            <div className="section">
              {/* 섹션 1: 성장하는 모임 */}
              <section className="flex flex-col gap-[32px] py-[65px] md:gap-[48px] md:px-[48px] md:py-[44px] lg:flex-row lg:px-[115px] lg:py-[162px]">
                <motion.div
                  className="flex h-[220px] w-full justify-center md:h-[436px] lg:justify-start"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={animations.imageAnimation}
                >
                  <div className="relative flex w-[375px] items-center justify-center md:w-[648px] lg:w-[436px]">
                    <img
                      src="/section1.png"
                      alt="코드만큼 성장하는 모임"
                      className="md:h-[406px] md:w-[287px] md:rounded-[10px] lg:h-[406px]"
                      width={148}
                      height={210}
                    />
                    <div className="absolute left-[43px] flex flex-col gap-[2.4px] md:left-[99px] md:top-[206px] lg:left-[2px] lg:top-[196px]">
                      <div className="text-[10px] font-semibold leading-[13px] text-Cgray500 md:text-[19.5px] md:leading-[25.5px]">
                        모임 시작
                      </div>
                      <div className="flex gap-[2.4px] text-[20px] leading-[24.5px] text-Cgray800">
                        <div className="text-[20px] font-semibold leading-[24.5px] md:text-[39px] md:leading-[47px]">
                          D-
                        </div>
                        <div className="text-[20px] font-semibold leading-[24.5px] md:text-[39px] md:leading-[47px]">
                          7
                        </div>
                        <div className="flex items-end pb-[3.5px] text-[9.5px] leading-[13px] md:text-[18.5px] md:leading-[25.4px]">
                          일
                        </div>
                      </div>
                    </div>
                    <button
                      className="absolute left-[231px] top-[167px] flex h-[18px] w-[97px] items-center justify-center rounded-[3px] bg-main text-[6px] text-white md:left-[364px] md:top-[293px] md:h-[33px] md:w-[187px] md:text-[11px] lg:left-[265px] lg:top-[293px]"
                      aria-label="모임 신청하기"
                    >
                      신청하기
                    </button>
                  </div>
                </motion.div>
                <motion.div
                  className="flex justify-center"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={animations.staggerContainer}
                >
                  <div className="flex w-[375px] flex-col gap-[24px] overflow-hidden whitespace-nowrap px-[16px] md:w-[498px] md:px-0 lg:w-[498px] lg:justify-center lg:pl-[90px]">
                    <motion.h2
                      className="typo-head2 text-Cgray800 md:text-[42px] md:font-extrabold md:leading-[54px] lg:text-[42px] lg:leading-[54px]"
                      variants={animations.fadeInUp}
                    >
                      코드만큼 성장하는 모임,
                      <br />
                      지금 시작하세요!
                    </motion.h2>
                    <motion.div
                      className="typo-head4 text-Cgray700 md:text-[20px] md:font-semibold md:leading-[28px] lg:text-[20px] lg:font-semibold lg:leading-[28px]"
                      variants={animations.fadeInUp}
                    >
                      스터디/모각코/사이드프로젝트/취미까지
                      <br />
                      다양한 모임을 원하는 기술스택으로 필터링 해보세요!
                    </motion.div>
                  </div>
                </motion.div>
              </section>
            </div>

            <div className="section">
              {/* 섹션 2: 기능 소개 */}
              <section className="flex flex-col-reverse gap-[32px] py-[65px] md:gap-[48px] md:px-[48px] md:py-[44px] lg:flex-row lg:px-[115px] lg:py-[162px]">
                <motion.div
                  className="flex justify-center"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={animations.staggerContainer}
                >
                  <div className="flex w-[375px] flex-col gap-[24px] overflow-hidden whitespace-nowrap px-[16px] md:w-[498px] md:px-0 lg:justify-center">
                    <motion.h2
                      className="typo-head2 text-Cgray800 md:text-[42px] md:font-extrabold md:leading-[54px] lg:text-[42px] lg:leading-[54px]"
                      variants={animations.fadeInUp}
                    >
                      모임 스타일에 맞게
                      <br />
                      모임을 개설할 수 있어요!
                    </motion.h2>
                    <motion.div
                      className="typo-head4 text-Cgray700 md:text-[20px] md:font-semibold md:leading-[28px] lg:text-[20px] lg:font-semibold lg:leading-[28px]"
                      variants={animations.fadeInUp}
                    >
                      신청자 정보를 확인하고 승인할 수 있어요.
                      <br />
                      모임 안에서 서로의 정보를 파악하고 교류를 시작하세요!
                    </motion.div>
                  </div>
                </motion.div>
                <motion.div
                  className="flex h-[220px] w-full justify-center md:h-[436px] lg:justify-end"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={animations.imageAnimation}
                >
                  <div className="relative flex w-[375px] items-center justify-center md:w-[498px]">
                    <img
                      src="/section2.png"
                      alt="모임 스타일에 맞는 모임 개설"
                      className="h-[210px] md:h-[406px] md:w-[287px] md:rounded-[10px] lg:h-[406px]"
                      width={148}
                      height={210}
                    />
                    <div className="absolute left-[62px] top-[73px] flex flex-col gap-[2.4px] md:left-0 md:top-[95px] md:gap-[6px]">
                      <div className="text-[5.35px] font-semibold leading-[7px] text-Cgray700 md:text-[12.6px] md:leading-[11.2px]">
                        모임 공개 여부
                      </div>
                      <div className="flex h-[16px] w-[63px] items-center rounded-[2.5px] border-[0.5px] border-main bg-Cgray200 px-[5px] text-[5px] text-Cgray700 md:h-[32.2px] md:w-[132px] md:px-[8.1px] md:text-[8px]">
                        비공개
                      </div>
                    </div>
                    <div className="absolute left-[210px] top-[156px] flex h-[20px] w-[101px] items-center justify-center gap-[5px] rounded-[6.25px] border-[0.5px] border-main bg-BG px-[5px] md:left-[282px] md:top-[293px] md:h-[45px] md:w-[220px] md:gap-[10px]">
                      <div className="flex gap-[3.1px] md:gap-[6.2px]">
                        {isMobile ? (
                          <SmallCheckIcon
                            className="rounded-[5.6px] text-white"
                            aria-hidden="true"
                          />
                        ) : (
                          <MediumCheckIcon
                            className="rounded-[5.6px] text-white"
                            aria-hidden="true"
                          />
                        )}
                        <div className="text-[4px] text-white md:text-[9px]">
                          모임 생성이 완료 되었습니다!
                        </div>
                      </div>
                      <button
                        className="flex h-[10px] w-[23.5px] items-center justify-center rounded-[2.5px] bg-main text-[4.5px] text-white md:h-[22px] md:w-[48px] md:text-[9.5px]"
                        aria-label="모임 생성 확인하기"
                      >
                        확인하기
                      </button>
                    </div>
                  </div>
                </motion.div>
              </section>
            </div>

            <div className="section">
              {/* 섹션 3: CTA */}
              <section className="flex flex-col items-center gap-[40px] py-[103px] md:gap-[60px] md:py-[273px] lg:gap-[60px] lg:py-[273px]">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={animations.fadeInUp}
                >
                  <h2 className="typo-head2 text-center text-white md:text-[42px] md:leading-[54px] lg:text-[42px] lg:leading-[54px]">
                    DEVING에서
                    <br />
                    당신의 모임을 바로 시작하세요!
                  </h2>
                </motion.div>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={animations.popIn}
                >
                  <Button className="" aria-label="Deving 모임 시작하기">
                    지금 시작하기
                  </Button>
                </motion.div>
              </section>
            </div>

            {/* 푸터 섹션 - 중요 클래스: section fp-auto-height */}
            <div className="section fp-auto-height">
              <footer
                className="flex h-[300px] flex-col items-center gap-[24px] px-[24px] pt-[60px] md:h-[300px] md:gap-[32px] md:px-[48px] md:pb-[60px] md:pt-[66px] lg:h-[300px] lg:px-[230px]"
                role="contentinfo"
              >
                <motion.div
                  className="flex w-full justify-center gap-[12px]"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div>
                    <LandingLogo />
                  </div>
                  <div>
                    <DevingLogo />
                  </div>
                </motion.div>
                <div className="text-[13px] text-Cgray500">
                  Copyright @ 2025 DEVING All Rights Reserved
                </div>
                <div className="w-full border border-Cgray200 lg:w-[1460px]"></div>
                <div className="flex gap-2">
                  <a
                    href="https://github.com/your-github"
                    aria-label="GitHub 계정 방문하기"
                  >
                    <GithubIcon />
                  </a>
                  <a
                    href="https://notion.so/your-notion"
                    aria-label="Notion 페이지 방문하기"
                  >
                    <NotionIcon />
                  </a>
                </div>
              </footer>
            </div>
          </FullPageWrapper>
        );
      }}
    />
  );
}
