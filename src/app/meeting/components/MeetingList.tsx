'use client';

import Profile from '@/assets/icon/profile.svg';
import Dropdown from '@/components/common/Dropdown';
import { Button } from '@/components/ui/Button';
import HorizonCard from '@/components/ui/HorizonCard';
import { SearchInput } from '@/components/ui/SearchInput';
import VerticalCard from '@/components/ui/VerticalCard';
import TechSelector from '@/components/ui/tech-stack/TechSelector';
import useInfiniteScroll from '@/hooks/common/useInfiniteScroll';
import useMediaQuery from '@/hooks/common/useMediaQuery';
import {
  MEETING_QUERY_KEYS,
  useInfiniteSearchMeetings,
} from '@/hooks/queries/useMeetingQueries';
import useDebounce from '@/hooks/useDebounde';
import { getDDay } from '@/util/date';
import { QueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import {
  CategoryTitle,
  IMeetingSearchCondition,
  SearchMeeting,
} from 'types/meeting';

import MeetingListSkeleton from './skeleton/MeetingListSkeleton';

const filterOptions = [
  {
    value: 'NEW',
    label: '최신순',
  },
  {
    value: 'OLD',
    label: '오래된순',
  },
  {
    value: 'LIKES',
    label: '좋아요순',
  },
];

export const translateCategoryNameToKor = (category: string): CategoryTitle => {
  switch (category) {
    case 'mogakco':
      return '모각코';
    case 'hobby':
      return '취미';
    case 'study':
      return '스터디';
    case 'side-project':
      return '사이드 프로젝트';
    default:
      return '모각코';
  }
};

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
    refetch,
  } = useInfiniteSearchMeetings(
    translateCategoryNameToKor(categoryStr),
    searchQuery,
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

  const queryClient = useMemo(() => new QueryClient(), []);

  // 필터에 따른 재검색
  useEffect(() => {
    queryClient.removeQueries({ queryKey: [MEETING_QUERY_KEYS.meetings] });
    refetch();
  }, [queryClient, searchQuery, refetch]);

  const [inputValue, setInputValue] = useState('');

  // 키워드 검색 시 사용되는 디바운스 훅
  useDebounce({
    value: inputValue,
    callBack: () => {
      handleSearchOption({ keyword: inputValue });
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  // 기술 선택 변경 핸들러
  const handleSelectionChange = (selection: string[]) => {
    setSelectedTechs(selection);
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
      {/* 기술스택 검색바 */}
      <SearchInput onChange={handleChange} />
      <TechSelector
        className="mt-2 p-2"
        maxSelections={5}
        onSelectionChange={handleSelectionChange}
      />

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

      {/* 모임 리스트 웹뷰 */}
      {breakpoint === 'desktop' && (
        <div className="hidden flex-col md:hidden lg:flex">
          {data?.pages.map((page, pageIndex) => (
            <div key={pageIndex}>
              {page.content.map((meeting: SearchMeeting) => {
                return (
                  <HorizonCard
                    key={meeting.meetingId}
                    meetingId={meeting.meetingId}
                    category={translateCategoryNameToKor(categoryStr)}
                    title={meeting.meetingTitle}
                    thumbnailUrl={meeting.thumbnail}
                    location={meeting.location}
                    isLike={meeting.isLike}
                    total={meeting.maxMember}
                    value={meeting.memberCount}
                    skills={meeting.meetingSkillResponse}
                  >
                    <div
                      ref={
                        page.nextCursor === meeting.meetingId
                          ? lastMeetingRef
                          : null
                      }
                      className="mt-5 md:w-[180px] lg:w-[318px]"
                    >
                      <div className="hidden flex-col md:flex lg:flex lg:flex-row">
                        <div className="mr-6 flex w-[147px] flex-col">
                          <div className="typo-head3 text-Cgray500">모임장</div>
                          <div className="typo-head2 mt-1 flex items-center text-Cgray700">
                            <Profile className="mr-2 h-10 w-10" />
                            <span className="text-ellipsi truncate">
                              {meeting.name}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div className="typo-head3 text-Cgray500">
                            모임시작
                          </div>
                          <div className="typo-head1 mt-1 text-Cgray700">
                            {getDDay(meeting.startDate)}
                          </div>
                        </div>
                      </div>
                      <Button
                        className="mt-6 md:h-[40px] md:w-[180px] lg:h-[46px] lg:w-[318px]"
                        onClick={() => handleMoveDetailPage(meeting.meetingId)}
                      >
                        신청하기
                      </Button>
                    </div>
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
                    total={meeting.maxMember}
                    value={meeting.memberCount}
                    skills={meeting.meetingSkillResponse}
                  >
                    <div
                      ref={
                        page.nextCursor === meeting.meetingId
                          ? lastMeetingRef
                          : null
                      }
                      className="mt-5 md:w-[180px] lg:w-[318px]"
                    >
                      <div className="hidden flex-col md:flex lg:flex lg:flex-row">
                        <div className="mr-6 flex w-[147px] flex-col">
                          <div className="typo-caption1 text-Cgray500">
                            모임장
                          </div>
                          <div className="typo-button2 mt-1 flex items-center text-Cgray700">
                            <Profile className="mr-2 h-10 w-10" />
                            <span className="text-ellipsi truncate">
                              김밤식김밤식
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div className="typo-caption1 text-Cgray500">
                            모임시작
                          </div>
                          <div className="typo-button2 mt-1 text-Cgray700">
                            D+14
                          </div>
                        </div>
                      </div>
                      <Button className="typo-button2 mt-[7px] md:h-[40px] md:w-[180px] lg:h-[46px] lg:w-[318px]">
                        신청하기
                      </Button>
                    </div>
                  </HorizonCard>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* 모임 리스트 모바일뷰 */}
      {breakpoint === 'mobile' && (
        <div className="flex flex-col md:hidden lg:hidden">
          {data?.pages.map((page, pageIndex) => (
            <div key={pageIndex}>
              {page.content.map((meeting: SearchMeeting) => {
                return (
                  <VerticalCard
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
                    total={meeting.maxMember}
                    value={meeting.memberCount}
                    skills={meeting.meetingSkillResponse}
                  >
                    <div
                      ref={
                        page.nextCursor === meeting.meetingId
                          ? lastMeetingRef
                          : null
                      }
                      className="mt-5 md:w-[180px] lg:w-[318px]"
                    >
                      <div className="hidden flex-col md:flex lg:flex lg:flex-row">
                        <div className="mr-6 flex w-[147px] flex-col">
                          <div className="typo-head3 text-Cgray500">모임장</div>
                          <div className="typo-head2 mt-1 flex items-center text-Cgray700">
                            <Profile className="mr-2 h-10 w-10" />
                            <span className="text-ellipsi truncate">
                              김밤식김밤식
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div className="typo-head3 text-Cgray500">
                            모임시작
                          </div>
                          <div className="typo-head1 mt-1 text-Cgray700">
                            D+14
                          </div>
                        </div>
                      </div>
                      <Button className="mt-6 h-[46px] w-[311px]">
                        신청하기
                      </Button>
                    </div>
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
