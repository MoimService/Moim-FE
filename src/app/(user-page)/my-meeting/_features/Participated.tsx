'use client';

import HorizonCard from '@/components/ui/HorizonCard';
import useInfiniteScroll from '@/hooks/common/useInfiniteScroll';
import { useInfiniteMyMeetingParticipatedQueries } from '@/hooks/queries/useMyMeetingQueries';
import { translateCategoryNameToEng } from '@/util/searchFilter';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IMyMeetingParticipated } from 'types/myMeeting';

import CardRightSection from './CardRightSection';
import LeaveMeetingButton from './LeaveMeetingButton';
import PendingSection from './PendingSection';
import PendingStatusChip from './PendingStatusChip';
import MeetingListSkeleton from './skeletons/SkeletonMeetingList';

interface IStatusOverlay {
  meeting: IMyMeetingParticipated;
}

const Participated = () => {
  const router = useRouter();

  // 참여한 모임 데이터 가져오기
  const {
    data: meetingData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteMyMeetingParticipatedQueries();

  // 무한 스크롤을 위한 ref
  const lastMeetingRef = useInfiniteScroll({
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage: !!hasNextPage,
  });

  // 로딩 중인 경우 스켈레톤 UI 표시
  if (isLoading || !meetingData) {
    return <MeetingListSkeleton />;
  }

  // 클릭 불가능한 상태인지 확인하는 함수 (오버레이 표시 여부만 결정)
  const isDisabledStatus = (
    status: IMyMeetingParticipated['myMemberStatus'],
  ): boolean => {
    return status === 'REJECTED' || status === 'EXPEL';
  };

  // 모임 상세 페이지 URL 생성 함수
  const getMeetingDetailUrl = (meeting: IMyMeetingParticipated) =>
    `/meeting/${translateCategoryNameToEng(meeting.categoryTitle)}/${meeting.meetingId}`;

  const handleCardClick = (meeting: IMyMeetingParticipated) => {
    router.push(getMeetingDetailUrl(meeting));
  };

  // 오버레이 컴포넌트 (수정된 버전)
  const StatusOverlay = ({ meeting }: IStatusOverlay) => (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-70">
      <div className={`max-w-md p-4 text-center text-xl font-bold text-white`}>
        {meeting.myMemberStatus === 'REJECTED' ? (
          <p className="text-2xl leading-relaxed">
            죄송합니다. 가입이 <span className="text-warning">거절</span>된
            모임입니다.
          </p>
        ) : (
          <p className="text-2xl leading-relaxed">
            더 이상 참여가 <span className="text-warning">불가능</span>한
            모임입니다.
          </p>
        )}
        <Link
          href={getMeetingDetailUrl(meeting)}
          className="hover:text-gray-200 mt-4 inline-block rounded border border-white px-4 py-2 text-white transition-colors duration-200"
        >
          상세페이지 보기
        </Link>
      </div>
    </div>
  );

  return (
    <div>
      {/* 승인 대기중인 모임 섹션 (상단에 배치) */}
      <PendingSection />
      <h1 className="typo-head1 mt-10 text-white">나의 Deving 모임</h1>
      {meetingData.pages.map((page, pageIdx) => (
        <div key={pageIdx}>
          {page.content.map((meeting) => (
            <div key={meeting.meetingId}>
              {/* 데스크탑 */}
              <div className="hidden border-b border-Cgray300 py-[42px] lg:flex">
                <div className="relative w-full">
                  <HorizonCard
                    onClick={() => handleCardClick(meeting)}
                    key={meeting.meetingId}
                    title={meeting.title}
                    thumbnailUrl={meeting.thumbnail}
                    location={meeting.location}
                    total={meeting.maxMember}
                    value={meeting.memberCount}
                    className="flex-row"
                    meetingId={meeting.meetingId}
                    showLikeButton={false}
                    category={''}
                  >
                    <CardRightSection
                      memberList={meeting.memberList}
                      className="hidden lg:flex"
                      meetingId={meeting.meetingId}
                    />
                  </HorizonCard>

                  {/* PENDING 상태일 때 승인 대기중 칩 표시 */}
                  {meeting.myMemberStatus === 'PENDING' && (
                    <PendingStatusChip meetingId={meeting.meetingId} />
                  )}

                  {/* APPROVED 상태일 때 모임 탈퇴하기 버튼 표시 */}
                  {meeting.myMemberStatus === 'APPROVED' &&
                    !meeting.isMeetingManager && (
                      <LeaveMeetingButton
                        meetingId={meeting.meetingId}
                        className="bg-warning text-white"
                      />
                    )}

                  {/* 비활성화된 상태일 때 오버레이 */}
                  {isDisabledStatus(meeting.myMemberStatus) && (
                    <StatusOverlay meeting={meeting} />
                  )}
                </div>
              </div>

              {/* 태블릿 */}
              <div className="relative hidden flex-col border-b border-Cgray300 py-[42px] md:flex lg:hidden">
                <HorizonCard
                  onClick={() => handleCardClick(meeting)}
                  key={meeting.meetingId}
                  title={meeting.title}
                  thumbnailUrl={meeting.thumbnail}
                  location={meeting.location}
                  total={meeting.maxMember}
                  value={meeting.memberCount}
                  thumbnailHeight={160}
                  thumbnailWidth={160}
                  className=""
                  meetingId={meeting.meetingId}
                  showLikeButton={false}
                  category={''}
                />
                <CardRightSection
                  memberList={meeting.memberList}
                  className="flex lg:hidden"
                  meetingId={meeting.meetingId}
                />

                {meeting.myMemberStatus === 'PENDING' && (
                  <PendingStatusChip meetingId={meeting.meetingId} />
                )}

                {meeting.myMemberStatus === 'APPROVED' &&
                  !meeting.isMeetingManager && (
                    <LeaveMeetingButton
                      meetingId={meeting.meetingId}
                      className="bg-warning text-white"
                    />
                  )}

                {isDisabledStatus(meeting.myMemberStatus) && (
                  <StatusOverlay meeting={meeting} />
                )}
              </div>

              {/* 모바일 */}
              <div className="relative flex flex-col border-b border-Cgray300 py-[42px] md:hidden">
                <HorizonCard
                  onClick={() => handleCardClick(meeting)}
                  key={meeting.meetingId}
                  title={meeting.title}
                  thumbnailUrl={meeting.thumbnail}
                  location={meeting.location}
                  total={meeting.maxMember}
                  value={meeting.memberCount}
                  thumbnailHeight={80}
                  thumbnailWidth={80}
                  className=""
                  meetingId={meeting.meetingId}
                  showLikeButton={false}
                  category={''}
                />
                <CardRightSection
                  memberList={meeting.memberList}
                  className="flex lg:hidden"
                  meetingId={meeting.meetingId}
                />
                {meeting.myMemberStatus === 'APPROVED' &&
                  !meeting.isMeetingManager && (
                    <LeaveMeetingButton
                      meetingId={meeting.meetingId}
                      className="bg-warning px-2 py-1 text-xs text-white"
                    />
                  )}

                {isDisabledStatus(meeting.myMemberStatus) && (
                  <StatusOverlay meeting={meeting} />
                )}
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* 무한 스크롤을 위한 별도의 Observer 요소 */}
      {hasNextPage && (
        <div
          ref={lastMeetingRef}
          id="infinite-scroll-trigger"
          className="mt-10 h-10" // 높이와 마진 추가
        />
      )}
      {/* 추가 데이터 로딩 중 표시 */}
      {isFetchingNextPage && <MeetingListSkeleton />}

      {/* 데이터가 없는 경우 표시 */}
      {meetingData.pages[0].content.length === 0 && (
        <div className="typo-head3 flex h-[60vh] w-full items-center justify-center text-center text-Cgray500">
          <div>
            <p className="mb-2">내가 참여하고있는 모임이 없어요.</p>
            <p>원하는 모임에 참가하세요!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Participated;
