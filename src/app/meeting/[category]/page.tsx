import FloatingButtonGroup from '@/components/common/FloatingButtonGroup';
import { notFound } from 'next/navigation';

import MeetingList from '../_features/MeetingList';
import RecommendMeeting from '../_features/RecommendMeeting';

const ALLOWED_CATEGORIES = ['mogakco', 'study', 'side-project', 'hobby']; // 허용된 카테고리 리스트

// 정적 경로 사전 생성
export async function generateStaticParams() {
  return ALLOWED_CATEGORIES.map((category) => ({ category }));
}

function MeetingListPage({ params }: { params: { category: string } }) {
  const { category } = params;

  // 허용되지 않은 category가 들어오면 404 페이지로 이동
  if (!ALLOWED_CATEGORIES.includes(category)) {
    notFound();
  }
  return (
    <div className="mb-[130px] mt-[88px]">
      <FloatingButtonGroup />
      <RecommendMeeting />
      <MeetingList />
    </div>
  );
}

export default MeetingListPage;
