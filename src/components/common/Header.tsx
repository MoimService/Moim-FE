'use client';

import Logo from '@/assets/icon/logo.svg';
import Profile from '@/assets/icon/profile.svg';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Dropdown from './Dropdown';

const BeforeLogin = () => {
  return (
    <nav className="ml-auto flex">
      <Link
        href="/login"
        className="text-head3 hidden h-[54px] items-center justify-center text-white lg:flex"
      >
        로그인
      </Link>
    </nav>
  );
};

const AfterLogin = () => {
  const router = useRouter();
  const menu = [
    {
      value: 'mymeeting',
      label: '내 모임',
      onSelect: () => router.push('/my-meeting'),
    },
    {
      value: 'mypage',
      label: '마이페이지',
      onSelect: () => router.push('/my-page'),
    },
    {
      value: 'logout',
      label: '로그아웃',
      onSelect: () => console.log('로그아웃'),
    },
  ];
  return (
    <nav className="ml-auto hidden lg:flex">
      <div className="flex items-center">
        <Dropdown
          options={menu}
          variant="image"
          className="h-10 w-10 rounded-full"
          contentClassName="mr-[85px]"
          imageProps={{
            component: <Profile className="h-10 w-10" />,
          }}
        />
        <span className="typo-head3 m-auto w-[77px] text-center text-white">
          김밤식
        </span>
      </div>
    </nav>
  );
};

const MobileBeforeLogin = () => {
  return (
    <div className="py-[24px]">
      <Link
        className="typo-head3 p-[16px] text-Cgray500 hover:text-Cgray700"
        href="/login"
      >
        로그인
      </Link>
      <Link
        className="typo-head3 p-[16px] text-main hover:text-[#5C73FF]"
        href="/signup"
      >
        회원가입
      </Link>
    </div>
  );
};

const MobileAfterLogin = () => {
  return (
    <div className="flex flex-col py-[24px]">
      <div className="flex items-center justify-between">
        <button
          className="typo-head3 p-[16px] text-Cgray500 hover:text-Cgray700"
          onClick={() => console.log('로그아웃')}
        >
          로그아웃
        </button>
        <div className="flex">
          <Profile />
          <span className="typo-head3 m-auto w-[77px] text-center text-white">
            김밤식
          </span>
        </div>
      </div>
      <Link
        className="typo-head4 p-[16px] text-Cgray400 hover:text-Cgray500"
        href="/my-page"
      >
        마이페이지
      </Link>
      <Link
        className="typo-head4 p-[16px] text-Cgray400 hover:text-Cgray500"
        href="/my-meeting"
      >
        나의 모임
      </Link>
    </div>
  );
};

const NavLinks = ({ isMobile }: { isMobile?: boolean }) => {
  return (
    <ul
      className={`${!isMobile ? 'hidden items-center text-Cgray700 lg:flex' : 'text-Cgray400'}`}
    >
      <li className="typo-head4 p-[16px]">
        <Link
          href="/Mogakco"
          className={`${isMobile ? 'hover:text-Cgray500' : 'hover:text-white'}`}
        >
          모각코
        </Link>
      </li>
      <li className="typo-head4 p-[16px]">
        <Link
          href="/study"
          className={`${isMobile ? 'hover:text-Cgray500' : 'hover:text-white'}`}
        >
          스터디
        </Link>
      </li>
      <li className="typo-head4 p-[16px]">
        <Link
          href="/side-project"
          className={`${isMobile ? 'hover:text-Cgray500' : 'hover:text-white'}`}
        >
          사이드 프로젝트
        </Link>
      </li>
      <li className="typo-head4 p-[16px]">
        <Link
          href="/hobby"
          className={`${isMobile ? 'hover:text-Cgray500' : 'hover:text-white'}`}
        >
          취미
        </Link>
      </li>
    </ul>
  );
};

const Header = ({ isLogIn = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      {/* desktop */}
      <header
        className={`flex h-20 items-center bg-BG px-[24px] lg:bg-main ${!isOpen && 'bg-main'}`}
      >
        <div className="item-center mx-auto flex w-full max-w-[1340px] items-center justify-between">
          <Link href="/" className="mr-[40px] flex-shrink-0">
            <Logo />
          </Link>
          <NavLinks />
          {!isLogIn ? <BeforeLogin /> : <AfterLogin />}
          <Menu
            className="text-white lg:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </div>
      </header>

      {/* mobile */}
      <div
        className={`fixed right-0 h-screen w-screen transform overflow-x-hidden bg-BG px-[24px] transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:hidden`}
      >
        {!isLogIn ? <MobileBeforeLogin /> : <MobileAfterLogin />}
        <NavLinks isMobile />
      </div>
    </div>
  );
};
export default Header;
