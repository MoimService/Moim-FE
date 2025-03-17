'use client';

import { motion, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';

import { useIsLargeScreen } from '../../hooks/useLargeScreen';

/**
 * 회색 고양이 컴포넌트 - 통통 튀는 애니메이션과 고정된 화난 눈 표정
 * 1920px 이상에서만 애니메이션 작동
 * 1920px 미만에서는 눈썹이 보이지 않음
 */
const GrayCat = () => {
  // 화면 크기 감지
  const isLargeScreen = useIsLargeScreen();

  // 모든 애니메이션을 제어할 컨트롤러 생성
  const controls = useAnimationControls();

  useEffect(() => {
    // 1920px 이상일 때만 애니메이션 실행
    if (isLargeScreen) {
      const startAnimation = async () => {
        // 초기 진입 애니메이션
        await controls.start('enter');

        // 반복 애니메이션 시작 (통통 튀는 동작)
        controls.start('loop');
      };

      startAnimation();
    } else {
      // 작은 화면에서는 정적 상태로 표시
      controls.start('static');
    }
  }, [controls, isLargeScreen]);

  // 고양이 애니메이션에 대한 변형(variants) 정의
  const catVariants = {
    initial: {
      opacity: 0,
      x: 40,
    },
    enter: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 60,
        damping: 10,
        delay: 1.0,
      },
    },
    loop: {
      y: [0, -8, 0],
      transition: {
        y: {
          duration: 0.5,
          repeat: Infinity,
          repeatDelay: 2,
          ease: 'easeOut',
          repeatType: 'loop',
        },
      },
    },
    static: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };

  // 왼쪽 눈에 대한 변형(variants) - 45도 회전 유지
  const leftEyeVariants = {
    initial: {
      opacity: 0,
      rotate: 45,
    },
    enter: {
      opacity: 1,
      rotate: 45,
      transition: {
        delay: 1.5,
        duration: 0.2,
      },
    },
    loop: {
      opacity: 1,
      rotate: 45,
      y: [0, -8, 0],
      transition: {
        y: {
          duration: 0.5,
          repeat: Infinity,
          repeatDelay: 2,
          ease: 'easeOut',
          repeatType: 'loop',
        },
      },
    },
    static: {
      opacity: 1,
      rotate: 45,
      y: 0,
    },
  };

  // 오른쪽 눈에 대한 변형(variants) - -45도 회전 유지
  const rightEyeVariants = {
    initial: {
      opacity: 0,
      rotate: -45,
    },
    enter: {
      opacity: 1,
      rotate: -45,
      transition: {
        delay: 1.5,
        duration: 0.2,
      },
    },
    loop: {
      opacity: 1,
      rotate: -45,
      y: [0, -8, 0],
      transition: {
        y: {
          duration: 0.5,
          repeat: Infinity,
          repeatDelay: 2,
          ease: 'easeOut',
          repeatType: 'loop',
        },
      },
    },
    static: {
      opacity: 1,
      rotate: -45,
      y: 0,
    },
  };

  return (
    <>
      {/* 회색 고양이 기본 이미지 - 통통 튀는 애니메이션 */}
      <motion.img
        src="/gray_cat.png"
        alt="회색 고양이"
        className="absolute left-[300px] top-[290px] h-[67px] w-[54px] md:left-[502px] md:top-[259px] md:h-[89px] md:w-[72px] lg:left-[668px] lg:top-[270px] lg:h-[133px] lg:w-[108px]"
        variants={catVariants}
        initial={isLargeScreen ? 'initial' : 'static'}
        animate={controls}
        viewport={{ once: true }}
      />

      {/* 화면 크기가 1920px 이상일 때만 눈썹 렌더링 */}
      {isLargeScreen && (
        <>
          {/* 화난 눈 모양 - 왼쪽 눈 (더 두껍고 아래로) */}
          <motion.div
            className="absolute left-[316px] top-[303px] h-[4px] w-[6px] bg-black md:left-[523px] md:top-[277px] md:h-[5px] md:w-[8px] lg:left-[692px] lg:top-[292px] lg:h-[7px] lg:w-[12px]"
            variants={leftEyeVariants}
            initial="initial"
            animate={controls}
            viewport={{ once: true }}
          />

          {/* 화난 눈 모양 - 오른쪽 눈 (더 두껍고 아래로) */}
          <motion.div
            className="absolute left-[325px] top-[303px] h-[4px] w-[6px] bg-black md:left-[535px] md:top-[277px] md:h-[5px] md:w-[8px] lg:left-[708px] lg:top-[292px] lg:h-[7px] lg:w-[12px]"
            variants={rightEyeVariants}
            initial="initial"
            animate={controls}
            viewport={{ once: true }}
          />
        </>
      )}
    </>
  );
};

export default GrayCat;
