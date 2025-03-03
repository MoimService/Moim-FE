import { Button } from '@/components/ui/Button';
import { baseURL } from '@/lib/axios/defaultConfig';

import DummyUser from './components/DummyUser';
import LoginForm from './components/LoginForm';

export const metadata = {
  metadataBase: new URL(`${baseURL}/login`),
  title: '로그인 | Deving',
  description: 'Deving에 로그인하고 다양한 서비스를 이용하세요',
  openGraph: {
    title: '로그인 | Deving',
    description: 'Deving에 로그인하고 다양한 서비스를 이용하세요',
    url: `${baseURL}/login`, // 추후 수정
    siteName: 'deving',
    type: 'website',
  },
};

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <LoginForm />
      {/* <DummyUser /> */}
    </div>
  );
}
