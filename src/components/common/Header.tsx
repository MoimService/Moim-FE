'use client';

import Logo from '@/assets/icon/logo.svg';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import Profile from '../../assets/icon/profile.svg';
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
  const menu = [
    { label: '내 모임' },
    { label: '마이페이지' },
    { label: '로그아웃' },
  ];
  return (
    <nav className="ml-auto hidden lg:flex">
      <div className="flex items-center">
        <Dropdown
          items={menu}
          trigger={<Image src={Profile} width={40} height={40} alt="profile" />}
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
      <div className="flex justify-between">
        <Link
          className="typo-head3 p-[16px] text-Cgray500 hover:opacity-5"
          href="/login"
        >
          로그아웃
        </Link>
        <div className="flex">
          <Image src={Profile} width={40} height={40} alt="profile" />
          <span className="typo-head3 m-auto w-[77px] text-center text-white">
            김밤식
          </span>
        </div>
      </div>
      <Link className="typo-head4 p-[16px] text-Cgray400" href="/signup">
        마이페이지
      </Link>
      <Link className="typo-head4 p-[16px] text-Cgray400" href="/signup">
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
            <Image src={Logo} width={40} height={40} alt="logo" />
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
        className={`absolute right-0 h-screen w-screen transform bg-BG px-[24px] transition-transform duration-300 ease-in-out ${
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
