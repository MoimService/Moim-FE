'use client';

import { motion } from 'framer-motion';

import { useIsLargeScreen } from '../../hooks/useLargeScreen';

/**
 * 농구공을 가진 하얀 고양이 컴포넌트
 * 1920px 이상에서만 애니메이션 작동
 */
const BasketballCat = () => {
  const isLargeScreen = useIsLargeScreen();

  return (
    <>
      {/* 하얀 고양이 - 가만히 있는 모습 */}
      <motion.img
        src="/white_cat.png"
        alt="고양이"
        className="absolute left-[164px] top-[30px] h-[62px] w-[61px] md:left-[342px] md:h-[82px] md:w-[81px] lg:left-[480px] lg:top-[0px] lg:h-[122px] lg:w-[121px]"
        initial={isLargeScreen ? { opacity: 0, y: -20 } : { opacity: 1 }}
        animate={
          isLargeScreen
            ? {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: 'easeOut',
                },
              }
            : { opacity: 1 }
        }
      />

      {/* 헤드셋 - 음악에 맞춰 움직이는 효과 */}
      <motion.img
        src="/headset.png"
        alt="헤드셋"
        className="absolute left-[164px] top-[32px] h-[30px] w-[57px] md:left-[342px] md:top-[30px] md:h-[40px] md:w-[76px] lg:left-[480px] lg:top-[0px] lg:h-[59px] lg:w-[113px]"
        initial={
          isLargeScreen ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }
        }
        animate={
          isLargeScreen
            ? {
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 0.5,
                  delay: 0.2,
                },
              }
            : { opacity: 1 }
        }
        whileInView={
          isLargeScreen
            ? {
                rotate: [-2, 2, -2, 2, -2],
                transition: {
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: [0.44, 0.56, 0.56, 0.44],
                  delay: 0.9,
                },
              }
            : {}
        }
        viewport={{ once: true }}
      />

      {/* 농구공 - 통통 튀는 효과 */}
      <motion.img
        src="/basketball.png"
        alt="농구공"
        className="absolute left-[165px] top-[72px] h-[18px] w-[18px] md:left-[342px] md:top-[90px] md:h-[24px] md:w-[24px] lg:left-[480px] lg:top-[80px] lg:h-[36px] lg:w-[36px]"
        initial={isLargeScreen ? { opacity: 0, y: -50 } : { opacity: 1 }}
        animate={
          isLargeScreen
            ? {
                opacity: 1,
                y: 0,
                transition: {
                  type: 'spring',
                  stiffness: 300,
                  damping: 10,
                  delay: 0.4,
                },
              }
            : { opacity: 1 }
        }
        whileInView={
          isLargeScreen
            ? {
                y: [0, -20, 20, -15, 10, -5, 0],
                transition: {
                  duration: 1.2,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                  ease: 'easeInOut',
                  delay: 1.2,
                },
              }
            : {}
        }
        viewport={{ once: true }}
      />
    </>
  );
};

export default BasketballCat;
