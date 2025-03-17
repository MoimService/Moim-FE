'use client';

import { motion } from 'framer-motion';

import { useIsLargeScreen } from '../../hooks/useLargeScreen';

/**
 * 앞 노트북 컴포넌트
 * 1920px 이상에서만 애니메이션 작동
 */
const FrontNotebook = () => {
  const isLargeScreen = useIsLargeScreen();

  return (
    <motion.img
      src="/front_notebook.png"
      alt="앞 노트북"
      className="absolute left-[263px] top-[298px] h-[51px] w-[40px] md:left-[456px] md:top-[269px] md:h-[67px] md:w-[53px] lg:left-[598px] lg:top-[280px] lg:h-[100px] lg:w-[79px]"
      initial={
        isLargeScreen ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }
      }
      animate={
        isLargeScreen
          ? {
              opacity: 1,
              scale: 1,
              transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
                delay: 0.9,
              },
            }
          : { opacity: 1 }
      }
      whileInView={
        isLargeScreen
          ? {
              filter: ['brightness(1)', 'brightness(1.15)', 'brightness(1)'],
              scale: [1, 1.02, 1],
              transition: {
                filter: {
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                },
                scale: {
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                },
                delay: 1.9,
              },
            }
          : {}
      }
      viewport={{ once: true }}
    />
  );
};

export default FrontNotebook;
