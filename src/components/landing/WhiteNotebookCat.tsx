'use client';

import { motion } from 'framer-motion';

import { useIsLargeScreen } from '../../hooks/useLargeScreen';

/**
 * 흰색 노트북 고양이 컴포넌트
 * 노트북 화면 깜빡임 대신 키보드 타이핑하는 듯한 효과
 */
const WhiteNotebookCat = () => {
  const isLargeScreen = useIsLargeScreen();

  return (
    <motion.img
      src="/white_notebook_cat.png"
      alt="흰색 노트북 고양이"
      className="absolute left-[114px] top-[355px] h-[74px] w-[57px] md:left-[244px] md:top-[319px] md:h-[98px] md:w-[75px] lg:left-[372px] lg:top-[324px] lg:h-[146px] lg:w-[112px]"
      initial={isLargeScreen ? { opacity: 0, y: 30 } : { opacity: 1 }}
      animate={
        isLargeScreen
          ? {
              opacity: 1,
              y: 0,
              transition: {
                type: 'spring',
                stiffness: 80,
                damping: 12,
                delay: 0.8,
              },
            }
          : { opacity: 1 }
      }
      whileInView={
        isLargeScreen
          ? {
              y: [0, -1, 0, -1, 0],
              x: [0, 0.5, 0, -0.5, 0],
              transition: {
                y: {
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'linear',
                },
                x: {
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'linear',
                },
                delay: 1.7,
              },
            }
          : {}
      }
      viewport={{ once: true }}
    />
  );
};

export default WhiteNotebookCat;
