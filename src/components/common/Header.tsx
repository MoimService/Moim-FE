'use client';

import Logo from '@/assets/icon/logo.svg';
import { useLogoutMutation } from '@/hooks/mutations/useUserMutation';
import { QUERY_KEYS } from '@/hooks/queries/useMyPageQueries';
import { useBannerQueries } from '@/hooks/queries/useMyPageQueries';
import { translateCategoryNameToKor } from '@/util/searchFilter';
import { useQueryClient } from '@tanstack/react-query';
import { MEETING_TYPES } from 'constants/category/category';
import { Menu } from 'lucide-react';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IBanner } from 'types/myMeeting';

import Dropdown from './Dropdown';

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
  const { mutate } = useLogoutMutation();

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
      onSelect: () => mutate(),
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
              <div className="flex flex-row items-center bg-transparent">
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
  const { mutate } = useLogoutMutation();
  return (
    <div className="flex flex-col py-[24px]">
      <div className="flex flex-col items-center justify-between">
        <div className="flex flex-col items-center gap-4">
          <Image
            width={40}
            height={40}
            className="h-[60px] w-[60px] rounded-full"
            src={userInfo.profilePic}
            alt="프로필 이미지"
          />
          <span
            title={userInfo.name}
            className="typo-head3 m-auto mb-4 w-full whitespace-nowrap text-center text-white"
          >
            {userInfo.name}
          </span>
        </div>
      </div>
      <button
        className="typo-head3 flex items-center gap-2 self-start p-[16px] text-left text-warning hover:text-Cgray700"
        onClick={() => mutate()}
      >
        로그아웃
        <LogOut size={16} />
      </button>

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
            {isMobile && <span className="mr-2">{item.icon}</span>}
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const Header = ({ userInfo: initialUserInfo }: { userInfo?: IBanner }) => {
  const [isOpen, setIsOpen] = useState(false);

  // useBannerQueries 훅을 사용하여 배너 정보를 가져옵니다.
  const { data: queryUserInfo, isLoading } = useBannerQueries({
    initialData: initialUserInfo || undefined, // 초기 데이터로 서버에서 받아온 값 사용
  });

  // 서버에서 받은 정보와 쿼리로 받은 정보를 병합
  const userInfo = queryUserInfo || initialUserInfo;
  const isLogIn = !!userInfo;

  const queryClient = useQueryClient();

  // 배너 정보가 변경될 때마다 쿼리 캐시 업데이트
  useEffect(() => {
    if (userInfo) {
      queryClient.setQueryData(QUERY_KEYS.banner(), userInfo);
    }
  }, [userInfo, queryClient]);

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
