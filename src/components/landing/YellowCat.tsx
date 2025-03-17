'use client';

import { motion } from 'framer-motion';

import { useIsLargeScreen } from '../../hooks/useLargeScreen';

/**
 * 노란 고양이 컴포넌트
 * 호기심 많은 고양이가 고개를 갸우뚱하는 애니메이션
 */
const YellowCat = () => {
  const isLargeScreen = useIsLargeScreen();

  return (
    <motion.img
      src="/yellow_cat.png"
      alt="노란 고양이"
      className="absolute left-[0px] top-[163px] h-[59px] w-[60px] md:left-[0px] md:top-[145px] md:h-[79px] md:w-[80px] lg:left-[10px] lg:top-[140px] lg:h-[117px] lg:w-[119px]"
      initial={
        isLargeScreen ? { opacity: 0, x: -60, rotate: -10 } : { opacity: 1 }
      }
      animate={
        isLargeScreen
          ? {
              opacity: 1,
              x: 0,
              rotate: 0,
              transition: {
                type: 'spring',
                stiffness: 70,
                damping: 12,
                delay: 0.7,
              },
            }
          : { opacity: 1 }
      }
      whileInView={
        isLargeScreen
          ? {
              rotate: [-5, 0, 5, 0, -5],
              y: [0, -3, 0],
              transition: {
                rotate: {
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
                y: {
                  duration: 4,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                },
                delay: 1.4,
              },
            }
          : {}
      }
      viewport={{ once: true }}
    />
  );
};

export default YellowCat;
