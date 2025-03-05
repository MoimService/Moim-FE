'use client';

import Dropdown from '@/components/common/Dropdown';
import HorizonCard from '@/components/ui/HorizonCard';
import { SearchInput } from '@/components/ui/SearchInput';
import VerticalCard from '@/components/ui/VerticalCard';
import TechSelector from '@/components/ui/tech-stack/TechSelector';
import useInfiniteScroll from '@/hooks/common/useInfiniteScroll';
import useMediaQuery from '@/hooks/common/useMediaQuery';
import { useInfiniteSearchMeetings } from '@/hooks/queries/useMeetingQueries';
import useDebounce from '@/hooks/useDebounde';
import { filterOptions, translateCategoryNameToKor } from '@/util/searchFilter';
import { keepPreviousData } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, useCallback, useState } from 'react';
import type { IMeetingSearchCondition, SearchMeeting } from 'types/meeting';

import MeetingExtraInfo from './MeetingExtraInfo';
import NoResultsMeeting from './NoResultsMeeting';
import MeetingListSkeleton from './skeleton/MeetingListSkeleton';

const MeetingList = () => {
  const { category } = useParams();
  const categoryStr = Array.isArray(category) ? category[0] : category;

  const [searchQuery, setSearchQuery] = useState<IMeetingSearchCondition>({
    keyword: '',
    skillArray: [],
    sortField: 'NEW',
    lastMeetingId: 0,
    size: 4,
  });

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteSearchMeetings(
    translateCategoryNameToKor(categoryStr),
    searchQuery,
    {
      placeholderData: keepPreviousData,
    },
  );

  const lastMeetingRef = useInfiniteScroll({
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  });

  const breakpoint = useMediaQuery();

  // 필터 변경 핸들러
  const handleSearchOption = useCallback(
    (newQuery: Partial<IMeetingSearchCondition>) => {
      // 기존 키워드와 동일하다면 API 호출하지 않도록 처리
      setSearchQuery((prev) => {
        if (prev.keyword === newQuery.keyword) {
          return prev;
        }
        return { ...prev, ...newQuery };
      });
    },
    [],
  );

  const [inputValue, setInputValue] = useState('');

  // 키워드 검색 시 사용되는 디바운스 훅
  useDebounce({
    value: inputValue,
    callBack: () => {
      handleSearchOption({ keyword: inputValue });
    },
    delay: 300,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // 기술 선택 변경 핸들러
  const handleSelectionChange = (selection: string[]) => {
    handleSearchOption({ skillArray: selection });
  };

  const router = useRouter();

  // 신청하기 버튼 클릭 시 상세페이지로 이동
  const handleMoveDetailPage = (meetingId: number) => {
    router.push(`/meeting/${category}/${meetingId}`);
  };

  if (isLoading) {
    return <MeetingListSkeleton />;
  }

  if (isError) {
    return <div className="typo text-white">에러 발생</div>;
  }

  return (
    <div className="mt-[126px]">
      <div className="typo-head1 mb-10 px-4 text-Cgray800">
        {translateCategoryNameToKor(categoryStr)} 모임 목록
      </div>
      <SearchInput
        className="mx-5"
        value={inputValue}
        onChange={handleChange}
      />

      {/* 기술스택 검색바 */}
      {categoryStr !== 'hobby' && (
        <TechSelector
          className="mt-2 p-2"
          maxSelections={5}
          onSelectionChange={handleSelectionChange}
        />
      )}

      {/* 드롭다운 */}
      <div className="my-4 flex w-full justify-end px-4">
        <Dropdown
          className="w-full md:w-[122px] lg:w-[122px]"
          options={filterOptions}
          onChange={(value) => handleSearchOption({ sortField: value })}
          trigger="최신순"
          variant="doubleArrow"
          sideOffset={8}
        />
      </div>

      {data?.pages[0].content.length === 0 && <NoResultsMeeting />}

      {/* 모임 리스트 웹뷰 */}
      {breakpoint === 'desktop' && (
        <div className="flex-col sm:hidden lg:flex">
          {data?.pages.map((page, pageIndex) => (
            <div key={pageIndex}>
              {page.content.map((meeting: SearchMeeting) => {
                return (
                  <HorizonCard
                    onClick={handleMoveDetailPage}
                    key={meeting.meetingId}
                    meetingId={meeting.meetingId}
                    category={translateCategoryNameToKor(categoryStr)}
                    title={meeting.meetingTitle}
                    thumbnailUrl={meeting.thumbnail}
                    location={meeting.location}
                    isLike={meeting.isLike}
                    total={meeting.maxMember}
                    value={meeting.memberCount}
                    searchQuery={searchQuery}
                    likesCount={meeting.likesCount}
                    skills={meeting.meetingSkillArray}
                  >
                    <MeetingExtraInfo
                      lastMeetingRef={
                        page.nextCursor === meeting.meetingId
                          ? lastMeetingRef
                          : null
                      }
                      name={meeting.name}
                      startDate={meeting.startDate}
                      meetingId={meeting.meetingId}
                      variant="desktop"
                    />
                  </HorizonCard>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* 모임 리스트 테블릿뷰 */}
      {breakpoint === 'tablet' && (
        <div className="hidden flex-col md:flex lg:hidden">
          {data?.pages.map((page, pageIndex) => (
            <div key={pageIndex}>
              {page.content.map((meeting: SearchMeeting) => {
                return (
                  <HorizonCard
                    onClick={handleMoveDetailPage}
                    className="items-center"
                    key={meeting.meetingId}
                    meetingId={meeting.meetingId}
                    category={translateCategoryNameToKor(categoryStr)}
                    title={meeting.meetingTitle}
                    thumbnailUrl={meeting.thumbnail}
                    thumbnailHeight={160}
                    thumbnailWidth={160}
                    location={meeting.location}
                    isLike={meeting.isLike}
                    likesCount={meeting.likesCount}
                    total={meeting.maxMember}
                    value={meeting.memberCount}
                    searchQuery={searchQuery}
                    skills={meeting.meetingSkillArray}
                  >
                    <MeetingExtraInfo
                      lastMeetingRef={
                        page.nextCursor === meeting.meetingId
                          ? lastMeetingRef
                          : null
                      }
                      name={meeting.name}
                      startDate={meeting.startDate}
                      meetingId={meeting.meetingId}
                      variant="tablet"
                    />
                  </HorizonCard>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* 모임 리스트 모바일뷰 */}
      {breakpoint === 'mobile' && (
        <div className="flex flex-col items-center md:hidden lg:hidden">
          {data?.pages.map((page, pageIndex) => (
            <div key={pageIndex}>
              {page.content.map((meeting: SearchMeeting) => {
                return (
                  <VerticalCard
                    onClick={handleMoveDetailPage}
                    className="h-[380px]"
                    thumbnailHeight={160}
                    thumbnailWidth={311}
                    category={translateCategoryNameToKor(categoryStr)}
                    key={meeting.meetingId}
                    meetingId={meeting.meetingId}
                    title={meeting.meetingTitle}
                    thumbnailUrl={meeting.thumbnail}
                    location={meeting.location}
                    isLike={meeting.isLike}
                    likesCount={meeting.likesCount}
                    total={meeting.maxMember}
                    value={meeting.memberCount}
                    searchQuery={searchQuery}
                    skills={meeting.meetingSkillArray}
                  >
                    <MeetingExtraInfo
                      lastMeetingRef={
                        page.nextCursor === meeting.meetingId
                          ? lastMeetingRef
                          : null
                      }
                      name={meeting.name}
                      startDate={meeting.startDate}
                      meetingId={meeting.meetingId}
                      variant="mobile"
                    />
                  </VerticalCard>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MeetingList;
