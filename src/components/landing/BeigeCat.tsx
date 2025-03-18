'use client';

import { motion } from 'framer-motion';

import { useIsLargeScreen } from '../../hooks/useLargeScreen';

/**
 * 베이지색 고양이 컴포넌트
 * 1920px 이상에서만 애니메이션 작동
 */
const BeigeCat = () => {
  const isLargeScreen = useIsLargeScreen();

  return (
    <motion.img
      src="/beige_cat.png"
      alt="베이지 고양이"
      className="absolute left-[32px] top-[175px] h-[66px] w-[54px] md:left-[40px] md:top-[170px] md:h-[88px] md:w-[71px] lg:left-[70px] lg:top-[180px] lg:h-[131px] lg:w-[106px]"
      initial={isLargeScreen ? { opacity: 0, x: -30, y: 20 } : { opacity: 1 }}
      animate={
        isLargeScreen
          ? {
              opacity: 1,
              x: 0,
              y: 0,
              transition: {
                type: 'spring',
                stiffness: 80,
                damping: 15,
                delay: 0.6,
              },
            }
          : { opacity: 1 }
      }
      whileInView={
        isLargeScreen
          ? {
              y: [0, -4, 0],
              scale: [1, 1.02, 1],
              transition: {
                y: {
                  duration: 4.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                },
                scale: {
                  duration: 4.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                },
                delay: 1.5,
              },
            }
          : {}
      }
      viewport={{ once: true }}
    />
  );
};

export default BeigeCat;
