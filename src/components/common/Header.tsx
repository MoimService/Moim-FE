'use client';

import Logo from '@/assets/icon/logo.svg';
import Profile from '@/assets/icon/profile.svg';
import { removeAccessToken } from '@/lib/serverActions';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import Dropdown from './Dropdown';
import { useToast } from './ToastContext';

const navigation = [
  { href: '/meeting/mogakco', label: '모각코' },
  { href: '/meeting/study', label: '스터디' },
  { href: '/meeting/side-project', label: '사이드 프로젝트' },
  { href: '/meeting/hobby', label: '취미' },
];

interface IUserInfo {
  userId: number;
  name: string;
  email: string;
  profilePic: string;
  phone: null | string;
}

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

const AfterLogin = ({ userInfo }: { userInfo: IUserInfo }) => {
  const router = useRouter();
  const { showToast } = useToast();
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
      onSelect: async () => {
        await removeAccessToken();
        // 로그아웃 관련 토스트바 노출
        showToast('로그아웃 되었습니다.', 'success');
      },
    },
  ];
  return (
    <nav className="ml-auto hidden lg:flex">
      <div className="flex items-center">
        <Dropdown
          options={menu}
          variant="image"
          className="h-10 w-10 rounded-full bg-transparent"
          contentClassName="mr-[85px]"
          imageProps={{
            component: (
              <Image
                src={userInfo.profilePic}
                width={40}
                height={40}
                alt="프로필 이미지"
              />
            ),
          }}
        />
        <span className="typo-head3 m-auto w-[77px] text-center text-white">
          {userInfo.name}
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

const MobileAfterLogin = ({ userInfo }: { userInfo: IUserInfo }) => {
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
          <Image
            width={40}
            height={40}
            className="h-[40px] w-[40px] rounded-full"
            src={userInfo.profilePic}
            alt="프로필 이미지"
          />
          <span className="typo-head3 m-auto w-[77px] text-center text-white">
            {userInfo.name}
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
  const { category } = useParams();
  const categoryStr = Array.isArray(category) ? category[0] : category;

  return (
    <ul
      className={`${!isMobile ? 'hidden items-center text-Cgray700 lg:flex' : 'text-Cgray400'}`}
    >
      {navigation.map((item) => (
        <li className="typo-head4 p-[16px]" key={item.label}>
          <Link
            href={item.href}
            className={`${isMobile ? 'hover:text-Cgray500' : 'hover:text-white'}`}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const Header = ({ userInfo }: { userInfo: IUserInfo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isLogIn = !!userInfo;
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
          {!isLogIn ? <BeforeLogin /> : <AfterLogin userInfo={userInfo} />}
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
        {!isLogIn ? (
          <MobileBeforeLogin />
        ) : (
          <MobileAfterLogin userInfo={userInfo} />
        )}
        <NavLinks isMobile />
      </div>
    </div>
  );
};
export default Header;
