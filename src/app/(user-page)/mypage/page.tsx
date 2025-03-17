// page.tsx (서버 컴포넌트)
import { prefetchProfileData } from '@/hooks/queries/useMyPageQueries';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';

import MyPageClient from './MyPageClient';
import ProfileImage from './_features/ProfileImage';
import SkeletonBasicInfo from './_features/skeletons/SkeletonBasicInfo';

export default async function MyPage() {
  // 서버 컴포넌트에서 QueryClient 생성
  const queryClient = new QueryClient();

  // 필요한 데이터 프리페치
  await prefetchProfileData(queryClient);

  return (
    <div className="flex flex-col px-[24px] pb-[100px]">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="md:mb-8">
          <ProfileImage />
        </div>
        <Suspense fallback={<SkeletonBasicInfo />}>
          <MyPageClient />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
