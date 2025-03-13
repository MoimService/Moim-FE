import Header from '@/components/common/Header';
import { ToastProvider } from '@/components/common/ToastContext';
import ReactQueryProviders from '@/hooks/useReactQuery';
import axiosInstance from '@/lib/axios/axiosInstance';
import { AxiosError } from 'axios';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'DEVING',
  description: '개발자들만의 다양한 모임을 즐겨요!',
  icons: {
    icon: '/logo.svg',
  },
};

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  weight: '100 900',
  variable: '--font-pretendard',
  display: 'swap',
});

async function getUserInfo() {
  try {
    const res = await axiosInstance.get(
      'https://deving.shop/api/v1/mypage/banner',
    );
    return res.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('error: ', error.status);
    }
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userInfo = await getUserInfo();

  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="bg-BG">
        <ReactQueryProviders>
          <ToastProvider>
            <Header userInfo={userInfo} />
            <div className="m-auto max-w-[1340px]">{children}</div>
          </ToastProvider>
        </ReactQueryProviders>
        <div id="modal-root" />
      </body>
    </html>
  );
}
