import { MY_COMMENT_KEY } from '@/hooks/queries/useMyCommentQueries';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { MY_COMMENT_TAB_LIST } from 'constants/mypage/mypageConstant';
import {
  getMyMeetingsWritableComments,
  getMyWrittenComments,
} from 'service/api/mycomments';
import { Paginated } from 'type-clyde/common/pagination';
import { MyComment } from 'type-clyde/meeting/comment';

import Tab from '../_features/Tab';
import Writable from '../_features/Writable';
import Written from '../_features/Written';

export default async function CommentsPage({
  searchParams,
}: {
  searchParams: { type: string };
}) {
  const type = searchParams?.type;

  const queryClient = new QueryClient();

  if (type === 'writable') {
    // 작성 가능한 리뷰 prefetch
    await queryClient.prefetchInfiniteQuery({
      queryKey: MY_COMMENT_KEY.written,
      queryFn: ({ pageParam }) => getMyMeetingsWritableComments(pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage: Paginated<MyComment>) => {
        return lastPage.nextCursor ?? null;
      },
    });
  } else {
    // 작성한 리뷰 prefetch
    await queryClient.prefetchInfiniteQuery({
      queryKey: MY_COMMENT_KEY.written,
      queryFn: ({ pageParam }) => getMyWrittenComments(pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage: Paginated<MyComment>) => {
        return lastPage.nextCursor ?? null;
      },
    });
  }

  return (
    <div>
      <div className="mt-6 flex flex-col gap-[24px]">
        <Tab type={type} tabList={MY_COMMENT_TAB_LIST} />
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {type === 'writable' ? <Writable /> : <Written />}
      </HydrationBoundary>
    </div>
  );
}
