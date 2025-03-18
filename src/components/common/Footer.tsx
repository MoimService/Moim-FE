'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

import DevingLogo from '../../assets/icon/devingLogo.svg';
import GithubIcon from '../../assets/icon/github_icon.svg';
import LandingLogo from '../../assets/icon/landing_logo.svg';
import NotionIcon from '../../assets/icon/notion_icon.svg';

// 애니메이션 설정
const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 },
  },
};

const Footer = () => {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';

  // 랜딩 페이지일 경우 Footer를 렌더링하지 않음
  if (isLandingPage) {
    return null;
  }

  return (
    <footer
      className="flex h-[300px] flex-col items-center gap-[24px] px-[24px] pt-[60px] md:h-[300px] md:gap-[32px] md:px-[48px] md:pb-[60px] md:pt-[66px] lg:h-[300px] lg:px-[230px]"
      role="contentinfo"
    >
      <motion.div
        className="flex w-full justify-center gap-[12px]"
        initial={animations.fadeIn.initial}
        animate={animations.fadeIn.animate}
        transition={animations.fadeIn.transition}
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
  );
};

export default Footer;
