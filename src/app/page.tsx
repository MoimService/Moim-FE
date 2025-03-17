'use client';

import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
// import Image from 'next/image'; // Next.js Image 컴포넌트 제거
import { useCallback, useEffect, useRef, useState } from 'react';

import DevingLogo from '../assets/icon/devingLogo.svg';
import GithubIcon from '../assets/icon/github_icon.svg';
import LandingLogo from '../assets/icon/landing_logo.svg';
import MediumCheckIcon from '../assets/icon/medium_check_icon.svg';
import NotionIcon from '../assets/icon/notion_icon.svg';
import SmallCheckIcon from '../assets/icon/small_check_Icon.svg';

// FullPage 타입 정의
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

const FallbackFullPage: React.FC = () => <div className="hidden"></div>;
FallbackFullPage.displayName = 'FallbackFullPage';

// LoadingFullPage 수정 - 텍스트 제거
const LoadingFullPage: React.FC = () => <div className="hidden"></div>;
LoadingFullPage.displayName = 'LoadingFullPage';

const FullPage = dynamic(
  () =>
    import('@fullpage/react-fullpage')
      .then((mod) => mod.default)
      .catch((err) => {
        console.error('FullPage 로드 실패:', err);
        return FallbackFullPage;
      }),
  {
    ssr: false,
    loading: () => <LoadingFullPage />,
  },
);

// Fallback 컴포넌트를 미리 정의하여 displayName 설정
const FallbackWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div>{children}</div>;
};
FallbackWrapper.displayName = 'FallbackWrapper';

const LoadingWrapper: React.FC = () => <div className="hidden"></div>;
LoadingWrapper.displayName = 'LoadingWrapper';

const FullPageWrapper = dynamic(
  () =>
    import('@fullpage/react-fullpage')
      .then((mod) => mod.default.Wrapper)
      .catch((err) => {
        console.error('FullPageWrapper 로드 실패:', err);
        return FallbackWrapper;
      }),
  {
    ssr: false,
    loading: () => <LoadingWrapper />,
  },
);

// 애니메이션 설정
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

// 개선된 오류 처리 및 정리 기능이 있는 래퍼 컴포넌트
const SafeFullPage: React.FC<FullPageProps> = (props) => {
  const [mounted, setMounted] = useState(false);
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const originalConsoleErrorRef = useRef<typeof console.error | null>(null);

  useEffect(() => {
    // 클라이언트 환경에 완전히 있는지 확인하기 위해 다음 틱까지 대기
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    // 원본 console.error 저장
    originalConsoleErrorRef.current = console.error;

    // fullPage 라이센스 경고를 위한 콘솔 필터링
    console.error = (...args: Parameters<typeof console.error>) => {
      if (
        typeof args[0] === 'string' &&
        (args[0].includes('fullPage:') ||
          args[0].includes('licenseKey') ||
          args[0].includes('alvarotrigo'))
      ) {
        return; // fullPage 라이센스 메시지 무시
      }
      // 다른 오류에 대해 원본 console.error 호출
      if (originalConsoleErrorRef.current) {
        originalConsoleErrorRef.current(...args);
      }
    };

    // fullPage 사용자 정의를 위한 스타일 요소 생성
    styleRef.current = document.createElement('style');
    if (styleRef.current) {
      styleRef.current.innerHTML = `
        .fp-watermark, #fp-nav ul li .fp-tooltip, .fp-warning {
          display: none !important;
        }

        /* 첫 번째 섹션 스크롤 제거 */
        #fp-nav + .fp-section:first-of-type {
          overflow: hidden !important;
        } 
        
        /* 자동 높이 섹션 스타일 */
        .fp-auto-height.fp-section {
          height: auto !important;
        }
        
        .fp-auto-height .fp-tableCell {
          height: auto !important;
          padding-bottom: 0 !important;
        }
      `;
      document.head.appendChild(styleRef.current);
    }

    return () => {
      clearTimeout(timer);
      setMounted(false);

      // 원본 console.error 복원
      if (originalConsoleErrorRef.current) {
        console.error = originalConsoleErrorRef.current;
      }

      // 더 안전한 DOM 조작으로 정리 함수
      try {
        const fpNav = document.querySelector('#fp-nav');
        if (fpNav) fpNav.remove();

        const sections = document.querySelectorAll('.section');
        sections.forEach((section) => {
          section.classList.remove('active', 'fp-section', 'fp-table');
        });

        // 스타일 요소 제거
        if (styleRef.current && document.head.contains(styleRef.current)) {
          document.head.removeChild(styleRef.current);
        }
      } catch (error) {
        console.error('정리 오류:', error);
      }
    };
  }, []);

  // SSR 문제 방지를 위해 마운트된 경우에만 FullPage 렌더링
  if (!mounted) {
    return (
      <div className="flex h-screen items-center justify-center text-white"></div>
    );
  }

  // 오류 처리를 추가하기 위해 props.render 래핑
  const safeRender = (renderProps: { fullpageApi?: unknown }) => {
    try {
      return props.render(renderProps);
    } catch (error) {
      console.error('렌더링 오류:', error);
      return <div></div>;
    }
  };

  return <FullPage {...props} render={safeRender} />;
};

// 이미지 로드 오류 처리 함수
const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  altText: string,
) => {
  const imgElement = event.currentTarget;
  imgElement.onerror = null; // 무한 루프 방지

  // 데이터 URI를 사용하여 SVG 자리 표시자 생성
  const width = imgElement.width || 300;
  const height = imgElement.height || 200;

  imgElement.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"%3E%3Crect width="${width}" height="${height}" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%23999"%3E${altText || '이미지 없음'}%3C/text%3E%3C/svg%3E`;
};

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [fullPageLoaded, setFullPageLoaded] = useState(false);

  // 디바운스가 있는 모바일 감지
  const checkMobile = useCallback(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

  // 더 안전한 afterLoad 핸들러
  const handleAfterLoad = useCallback(
    (destination: { index: number }): void => {
      if (destination && typeof destination.index === 'number') {
        setCurrentSection(destination.index);
      }
    },
    [],
  );

  // 더 나은 오류 처리로 모듈 사전 로드
  const preloadModules = useCallback(async () => {
    try {
      await import('@fullpage/react-fullpage');
      setFullPageLoaded(true);
    } catch (error) {
      console.error('FullPage 모듈 로드 실패:', error);
    }
  }, []);

  useEffect(() => {
    // 정리로 메모리 누수 방지
    let mounted = true;

    // 안전한 클라이언트 측 감지
    if (typeof window !== 'undefined' && mounted) {
      setIsClient(true);
      checkMobile();

      // 디바운스된 리사이즈 리스너 추가
      let resizeTimer: NodeJS.Timeout;
      const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          if (mounted) checkMobile();
        }, 250);
      };

      window.addEventListener('resize', handleResize);

      // 모듈 사전 로드
      preloadModules();

      return () => {
        mounted = false;
        clearTimeout(resizeTimer);
        window.removeEventListener('resize', handleResize);
      };
    }

    return () => {
      mounted = false;
    };
  }, [checkMobile, preloadModules]);

  if (!isClient || !fullPageLoaded) {
    return <div className="hidden"></div>;
  }

  return (
    <SafeFullPage
      credits={{
        enabled: true,
        position: 'right',
      }}
      scrollingSpeed={1000}
      navigation={true}
      navigationPosition={'right'}
      touchSensitivity={50}
      bigSectionsDestination="top"
      scrollOverflow={false}
      licenseKey={'YOUR_LICENSE_KEY'} // 라이센스 키 자리 표시자
      afterLoad={handleAfterLoad}
      render={({ fullpageApi }) => {
        return (
          <FullPageWrapper>
            <div className="section">
              {/* 히어로 섹션 */}
              <main className="md:h-[1085px] lg:h-[1168px] lg:pt-[83px] md:short:h-auto">
                <motion.h1
                  className="flex justify-center overflow-hidden whitespace-nowrap pt-[120px] text-center text-[32px] font-semibold leading-[41px] text-solid md:pt-[180px] md:text-[56px] md:leading-[90px] lg:pt-[100px] lg:text-[72px] lg:leading-[90px] short:pt-[140px] md:short:pt-[20px] md:short:text-[32px] md:short:leading-[41px]"
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
                  className="flex justify-center py-[60px] md:px-[48px] md:pb-[102px] md:pt-[40px] lg:px-[115px] lg:pb-[76px] lg:pt-[124px] md:short:px-0 md:short:pb-[40px] md:short:pt-[40px]"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={animations.imageAnimation}
                >
                  {/* Next.js Image 대신 일반 img 태그 사용 */}
                  <div className="relative flex h-[450px] w-[375px] justify-center md:w-[744px] lg:w-[1110px] md:short:h-[300px]">
                    <img
                      src="/white_cat.png"
                      alt="고양이"
                      className="absolute left-[164px] top-[30px] h-[62px] w-[61px] md:left-[342px] md:h-[82px] md:w-[81px] lg:left-[480px] lg:top-[0px] lg:h-[122px] lg:w-[121px]"
                    />
                    <img
                      src="/headset.png"
                      alt="고양이"
                      className="absolute left-[164px] top-[32px] h-[30px] w-[57px] md:left-[342px] md:top-[30px] md:h-[40px] md:w-[76px] lg:left-[480px] lg:top-[0px] lg:h-[59px] lg:w-[113px]"
                    />
                    <img
                      src="/basketball.png"
                      alt="고양이"
                      className="absolute left-[165px] top-[72px] h-[18px] w-[18px] md:left-[342px] md:top-[90px] md:h-[24px] md:w-[24px] lg:left-[480px] lg:top-[80px] lg:h-[36px] lg:w-[36px]"
                    />
                    <img
                      src="/heart_notebook.png"
                      alt="고양이"
                      className="absolute left-[52px] top-[154px] h-[44px] w-[55px] md:left-[80px] md:top-[136px] md:h-[58px] md:w-[73px] lg:left-[130px] lg:top-[130px] lg:h-[86px] lg:w-[109px]"
                    />
                    <img
                      src="/beige_cat.png"
                      alt="고양이"
                      className="absolute left-[32px] top-[175px] h-[66px] w-[54px] md:left-[40px] md:top-[170px] md:h-[88px] md:w-[71px] lg:left-[70px] lg:top-[180px] lg:h-[131px] lg:w-[106px]"
                    />
                    <img
                      src="/yellow_cat.png"
                      alt="고양이"
                      className="absolute left-[0px] top-[163px] h-[59px] w-[60px] md:left-[0px] md:top-[145px] md:h-[79px] md:w-[80px] lg:left-[10px] lg:top-[140px] lg:h-[117px] lg:w-[119px]"
                    />
                    <img
                      src="/read_cat.png"
                      alt="고양이"
                      className="absolute left-[300px] top-[132px] h-[73px] w-[66px] md:left-[617px] md:top-[128px] md:h-[97px] md:w-[87px] lg:left-[900px] lg:top-[120px] lg:h-[144px] lg:w-[130px]"
                    />

                    <img
                      src="/white_notebook_cat.png"
                      alt="고양이"
                      className="absolute left-[114px] top-[355px] h-[74px] w-[57px] md:left-[244px] md:top-[319px] md:h-[98px] md:w-[75px] lg:left-[372px] lg:top-[324px] lg:h-[146px] lg:w-[112px]"
                    />
                    <img
                      src="/front_notebook.png"
                      alt="고양이"
                      className="absolute left-[263px] top-[298px] h-[51px] w-[40px] md:left-[456px] md:top-[269px] md:h-[67px] md:w-[53px] lg:left-[598px] lg:top-[280px] lg:h-[100px] lg:w-[79px]"
                    />
                    <img
                      src="/gray_cat.png"
                      alt="고양이"
                      className="absolute left-[300px] top-[290px] h-[67px] w-[54px] md:left-[502px] md:top-[259px] md:h-[89px] md:w-[72px] lg:left-[668px] lg:top-[270px] lg:h-[133px] lg:w-[108px]"
                    />
                  </div>
                </motion.div>
              </main>
            </div>

            <div className="section">
              {/* 섹션 1: 성장하는 커뮤니티 */}
              <section className="flex flex-col gap-[32px] py-[65px] md:gap-[48px] md:px-[48px] md:py-[44px] lg:flex-row lg:px-[115px] lg:py-[162px]">
                <motion.div
                  className="flex h-[220px] w-full justify-center md:h-[436px] lg:justify-start md:short:h-[220px]"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={animations.imageAnimation}
                >
                  <div className="relative flex w-[375px] items-center justify-center md:w-[648px] lg:w-[436px] md:short:w-[375px]">
                    {/* Next.js Image 대신 일반 img 태그 사용 */}
                    <div className="relative h-[210px] w-[148px] md:h-[406px] md:w-[287px] md:short:h-[210px] md:short:w-[148px]">
                      <img
                        src="/section1.png"
                        alt="코드만큼 성장하는 모임"
                        className="h-full w-full rounded-[10px] object-cover"
                        onError={(e) =>
                          handleImageError(e, '코드만큼 성장하는 모임')
                        }
                      />
                    </div>
                    <div className="absolute left-[43px] flex flex-col gap-[2.4px] md:left-[99px] md:top-[206px] lg:left-[2px] lg:top-[196px] md:short:left-[43px] md:short:top-auto">
                      <div className="text-[10px] font-semibold leading-[13px] text-Cgray500 md:text-[19.5px] md:leading-[25.5px] md:short:text-[10px] md:short:leading-[13px]">
                        모임 시작
                      </div>
                      <div className="flex gap-[2.4px] text-[20px] leading-[24.5px] text-Cgray800">
                        <div className="text-[20px] font-semibold leading-[24.5px] md:text-[39px] md:leading-[47px] md:short:text-[20px] md:short:leading-[24.5px]">
                          D-
                        </div>
                        <div className="text-[20px] font-semibold leading-[24.5px] md:text-[39px] md:leading-[47px] md:short:text-[20px] md:short:leading-[24.5px]">
                          7
                        </div>
                        <div className="flex items-end pb-[3.5px] text-[9.5px] leading-[13px] md:text-[18.5px] md:leading-[25.4px] md:short:text-[9.5px] md:short:leading-[13px]">
                          일
                        </div>
                      </div>
                    </div>
                    <button
                      className="absolute left-[231px] top-[167px] flex h-[18px] w-[97px] items-center justify-center rounded-[3px] bg-main text-[6px] text-white md:left-[364px] md:top-[293px] md:h-[33px] md:w-[187px] md:text-[11px] lg:left-[265px] lg:top-[293px] md:short:left-[231px] md:short:top-[167px] md:short:h-[18px] md:short:w-[97px] md:short:text-[6px]"
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
                  className="flex h-[220px] w-full justify-center md:h-[436px] lg:justify-end md:short:h-[220px]"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={animations.imageAnimation}
                >
                  <div className="relative flex w-[375px] items-center justify-center md:w-[498px] md:short:w-[375px]">
                    {/* Next.js Image 대신 일반 img 태그 사용 */}
                    <div className="relative h-[210px] w-[148px] md:h-[406px] md:w-[287px] md:short:h-[210px] md:short:w-[148px]">
                      <img
                        src="/section2.png"
                        alt="모임 스타일에 맞는 모임 개설"
                        className="h-full w-full rounded-[10px] object-cover"
                        onError={(e) =>
                          handleImageError(e, '모임 스타일에 맞는 모임 개설')
                        }
                      />
                    </div>
                    <div className="absolute left-[62px] top-[73px] flex flex-col gap-[2.4px] md:left-0 md:top-[95px] md:gap-[6px] md:short:left-[62px] md:short:top-[73px] md:short:gap-[2.4px]">
                      <div className="text-[5.35px] font-semibold leading-[7px] text-Cgray700 md:text-[12.6px] md:leading-[11.2px] md:short:text-[5.35px] md:short:leading-[7px]">
                        모임 공개 여부
                      </div>
                      <div className="flex h-[16px] w-[63px] items-center rounded-[2.5px] border-[0.5px] border-main bg-Cgray200 px-[5px] text-[5px] text-Cgray700 md:h-[32.2px] md:w-[132px] md:px-[8.1px] md:text-[8px] md:short:h-[16px] md:short:w-[63px] md:short:px-[5px] md:short:text-[5px]">
                        비공개
                      </div>
                    </div>
                    <div className="absolute left-[210px] top-[156px] flex h-[20px] w-[101px] items-center justify-center gap-[5px] rounded-[6.25px] border-[0.5px] border-main bg-BG px-[5px] md:left-[282px] md:top-[293px] md:h-[45px] md:w-[220px] md:gap-[10px] md:short:left-[210px] md:short:top-[156px] md:short:h-[20px] md:short:w-[101px] md:short:gap-[5px] md:short:px-[5px]">
                      <div className="flex gap-[3.1px] md:gap-[6.2px] md:short:gap-[3.1px]">
                        {typeof isMobile !== 'undefined' &&
                          (isMobile ? (
                            <SmallCheckIcon
                              className="rounded-[5.6px] text-white"
                              aria-hidden="true"
                            />
                          ) : (
                            <MediumCheckIcon
                              className="rounded-[5.6px] text-white"
                              aria-hidden="true"
                            />
                          ))}
                        <div className="text-[4px] text-white md:text-[9px] md:short:text-[4px]">
                          모임 생성이 완료 되었습니다!
                        </div>
                      </div>
                      <button
                        className="flex h-[10px] w-[23.5px] items-center justify-center rounded-[2.5px] bg-main text-[4.5px] text-white md:h-[22px] md:w-[48px] md:text-[9.5px] md:short:h-[10px] md:short:w-[23.5px] md:short:text-[4.5px]"
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
