'use client';

import Logo from '@/assets/icon/logo.svg';
import { QUERY_KEYS } from '@/hooks/queries/useMyPageQueries';
import { removeAccessToken } from '@/lib/serverActions';
import { translateCategoryNameToKor } from '@/util/searchFilter';
import { useQueryClient } from '@tanstack/react-query';
import { MEETING_TYPES } from 'constants/category/category';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IBanner } from 'types/myMeeting';

import Dropdown from './Dropdown';
import { useToast } from './ToastContext';

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
        className="text-head3 hidden h-[54px] items-center justify-center text-white md:flex"
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
      onSelect: () => router.push('/my-meeting/my?type=created'),
    },
    {
      value: 'mypage',
      label: '마이페이지',
      onSelect: () => router.push('/mypage'),
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
    <nav className="ml-auto hidden md:flex">
      <div className="flex items-center">
        <Dropdown
          options={menu}
          variant="image"
          className="flex items-center bg-transparent"
          contentClassName="mr-2 [&>*]:text-white [&>*:hover]:text-main "
          sideOffset={10}
          imageProps={{
            component: (
              <div className="flex items-center bg-transparent">
                <div className="group relative h-10 w-10">
                  <div className="absolute inset-0 -m-1 rounded-full border-2 border-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <Image
                    src={userInfo.profilePic}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full"
                    alt="프로필 이미지"
                  />
                </div>
                <span
                  title={userInfo.name}
                  className="typo-head3 ml-2 w-[77px] truncate text-center text-white"
                >
                  {userInfo.name}
                </span>
              </div>
            ),
          }}
        />
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
  const { showToast } = useToast();
  return (
    <div className="flex flex-col py-[24px]">
      <div className="flex items-center justify-between">
        <button
          className="typo-head3 p-[16px] text-Cgray500 hover:text-Cgray700"
          onClick={async () => {
            await removeAccessToken();
            showToast('로그아웃 되었습니다.', 'success');
          }}
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
          <span
            title={userInfo.name}
            className="typo-head3 m-auto w-[77px] truncate text-center text-white"
          >
            {userInfo.name}
          </span>
        </div>
      </div>
      <Link
        className="typo-head4 p-[16px] text-Cgray400 hover:text-Cgray500"
        href="/mypage"
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
      className={`${!isMobile ? 'hidden items-center text-Cgray700 md:flex' : 'text-Cgray400'}`}
    >
      {MEETING_TYPES.map((item) => (
        <li
          className={`typo-head3 p-[16px] ${
            category &&
            translateCategoryNameToKor(categoryStr) === item.label &&
            'text-white'
          }`}
          key={item.label}
        >
          <Link
            href={item.href}
            className={`flex items-center ${isMobile ? 'hover:text-Cgray500' : 'hover:text-white'}`}
          >
            {!isMobile && <span className="mr-2">{item.icon}</span>}
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const Header = ({ userInfo }: { userInfo: IBanner }) => {
  const [isOpen, setIsOpen] = useState(false);
  const userId = undefined;
  const isLogIn = !!userInfo;

  const queryClient = useQueryClient();
  useEffect(() => {
    if (userInfo) {
      queryClient.setQueryData(QUERY_KEYS.banner(), userInfo);
    }
  }, [userInfo]);

  return (
    <div>
      {/* desktop */}
      <header
        className={`fixed left-0 right-0 top-0 z-50 flex h-20 items-center bg-BG px-[24px] md:bg-main ${!isOpen && 'bg-main'}`}
      >
        <div className="item-center mx-auto flex w-full max-w-[1340px] items-center justify-between">
          <Link href="/" className="mr-[40px] flex-shrink-0">
            <Logo />
          </Link>
          <NavLinks />
          {!isLogIn ? <BeforeLogin /> : <AfterLogin userInfo={userInfo} />}
          <Menu
            className="cursor-pointer text-white md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </div>
      </header>

      {/* mobile */}
      <div
        className={`fixed right-0 z-50 h-screen w-screen transform cursor-default overflow-x-hidden bg-BG px-[24px] transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsOpen(false);
          }
        }}
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
