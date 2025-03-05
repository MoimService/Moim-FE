import { baseURL } from '@/lib/axios/defaultConfig';

import SignupForm from './_features/SignupForm';

export const metadata = {
  metadataBase: new URL(`${baseURL}/signup`),
  title: '회원가입 | Deving',
  description: 'Deving에 가입하고 다양한 서비스를 이용하세요',
  openGraph: {
    title: '회원가입 | Deving',
    description: 'Deving에 가입하고 다양한 서비스를 이용하세요',
    url: `${baseURL}/signup`, // 추후 수정
    siteName: 'deving',
    type: 'website',
  },
};

export default function Signup() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignupForm />
    </div>
  );
}
