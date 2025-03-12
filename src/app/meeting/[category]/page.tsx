import FloatingButtonGroup from '@/components/common/FloatingButtonGroup';
import { MEETING_QUERY_KEYS } from '@/hooks/queries/useMeetingQueries';
import { translateCategoryNameToKor } from '@/util/searchFilter';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { MEETING_TYPES } from 'constants/meeting-form/meetingConstants';
import { notFound } from 'next/navigation';
import { getMeetings, getTopMeetings } from 'service/api/meeting';
import { Paginated, SearchMeeting } from 'types/meeting';

import MeetingList from '../_features/MeetingList';
import RecommendMeeting from '../_features/RecommendMeeting';

// 정적 경로 사전 생성
export async function generateStaticParams() {
  return MEETING_TYPES.map((category) => category.id);
}

async function MeetingListPage({ params }: { params: { category: string } }) {
  const { category } = params;

  const queryClient = new QueryClient();

  const initialSearchQueryObj = {
    keyword: '',
    skillArray: [],
    sortField: 'CREATED',
    lastMeetingId: 0,
    size: 4,
  };

  await queryClient.prefetchQuery({
    queryKey: MEETING_QUERY_KEYS.topMeetings(
      translateCategoryNameToKor(category),
    ),
    queryFn: () => getTopMeetings(translateCategoryNameToKor(category)),
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: MEETING_QUERY_KEYS.meetings(
      translateCategoryNameToKor(category),
      initialSearchQueryObj,
    ),
    queryFn: () =>
      getMeetings(
        0,
        translateCategoryNameToKor(category),
        initialSearchQueryObj,
      ),
    getNextPageParam: (lastPage: Paginated<SearchMeeting>) =>
      lastPage.nextCursor ?? false,
    initialPageParam: 0,
  });

  // 허용되지 않은 category가 들어오면 404 페이지로 이동
  if (!MEETING_TYPES.map((category) => category.id).includes(category)) {
    notFound();
  }
  return (
    <div className="mb-[130px] mt-[88px]">
      <FloatingButtonGroup />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <RecommendMeeting />
        <MeetingList />
      </HydrationBoundary>
    </div>
  );
}

export default MeetingListPage;
