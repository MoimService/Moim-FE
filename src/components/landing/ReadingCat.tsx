'use client';

import { motion } from 'framer-motion';

import { useIsLargeScreen } from '../../hooks/useLargeScreen';

const ReadingCat = () => {
  const isLargeScreen = useIsLargeScreen();

  return (
    <motion.img
      src="/read_cat.png"
      alt="책 읽는 고양이"
      className="absolute left-[300px] top-[132px] h-[73px] w-[66px] md:left-[617px] md:top-[128px] md:h-[97px] md:w-[87px] lg:left-[900px] lg:top-[120px] lg:h-[144px] lg:w-[130px]"
      initial={isLargeScreen ? { opacity: 0, x: 50 } : { opacity: 1 }}
      animate={
        isLargeScreen
          ? {
              opacity: 1,
              x: 0,
              transition: {
                type: 'spring',
                stiffness: 60,
                damping: 15,
                delay: 0.6,
              },
            }
          : { opacity: 1 }
      }
      whileInView={
        isLargeScreen
          ? {
              y: [0, -5, 0],
              rotate: [0, 1, 0],
              transition: {
                y: {
                  duration: 4,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                },
                rotate: {
                  duration: 5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                },
                delay: 1.2,
              },
            }
          : {}
      }
      viewport={{ once: true }}
    />
  );
};

export default ReadingCat;
