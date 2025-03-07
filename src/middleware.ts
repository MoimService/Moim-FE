import { getAccessToken } from '@/lib/serverActions';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // 인증 토큰 확인
  const token = await getAccessToken();

  // 토큰이 없으면 로그인 페이지로 리다이렉트
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const { pathname, searchParams } = request.nextUrl;

  // /my-meeting/comments' 경로에서 type 쿼리 파라미터가 없으면 writable로 세팅
  if (pathname === '/my-meeting/comments' && !searchParams.has('type')) {
    searchParams.set('type', 'writable');
    return NextResponse.redirect(request.nextUrl);
  }

  // 인증된 사용자는 요청을 계속 진행
  return NextResponse.next();
}

// 미들웨어가 적용될 경로를 지정
export const config = {
  matcher: ['/mypage', '/my-meeting/:path*'],
};
