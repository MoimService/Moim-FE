'use client';

import { motion } from 'framer-motion';

import { useIsLargeScreen } from '../../hooks/useLargeScreen';

/**
 * 하트 노트북 컴포넌트
 * 1920px 이상에서만 애니메이션 작동
 */
const HeartNotebookCat = () => {
  const isLargeScreen = useIsLargeScreen();

  return (
    <motion.img
      src="/heart_notebook.png"
      alt="하트 노트북"
      className="absolute left-[52px] top-[154px] h-[44px] w-[55px] md:left-[80px] md:top-[136px] md:h-[58px] md:w-[73px] lg:left-[130px] lg:top-[130px] lg:h-[86px] lg:w-[109px]"
      initial={
        isLargeScreen ? { opacity: 0, x: -40, scale: 0.9 } : { opacity: 1 }
      }
      animate={
        isLargeScreen
          ? {
              opacity: 1,
              x: 0,
              scale: 1,
              transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
                delay: 0.5,
              },
            }
          : { opacity: 1 }
      }
      whileInView={
        isLargeScreen
          ? {
              scale: [1, 1.08, 1, 1.08, 1],
              y: [0, -5, 0],
              transition: {
                scale: {
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: 'easeInOut',
                },
                y: {
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                },
                delay: 1,
              },
            }
          : {}
      }
      viewport={{ once: true }}
    />
  );
};

export default HeartNotebookCat;
