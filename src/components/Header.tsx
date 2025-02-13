import Logo from '@/assets/logo.svg';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="h-20 bg-BG flex items-center">
      <div className="max-w-[1340px] w-full flex justify-between item-center mx-auto">
        <div className="flex-shrink-0">
          <Image src={Logo} width={40} height={40} alt="logo" />
        </div>
        <nav className="flex ml-auto">
          <Link
            href="/login"
            className="w-[91px] h-[54px] text-head3 text-Cgray500 flex items-center justify-center"
          >
            로그인
          </Link>
          <Link
            href="/signup"
            className="w-[91px] h-[54px] text-head3 text-Cgray500 flex items-center justify-center"
          >
            회원가입
          </Link>
        </nav>
      </div>
    </header>
  );
};
export default Header;
