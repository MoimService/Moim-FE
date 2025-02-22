'use client';

import VerticalCard from '@/components/ui/VerticalCard';

export const popularMeetings = [
  {
    id: 1,
    title: '코드잇 스프린트',
    location: '서울 성동구 서울숲길 17 공원',
    category: '스터디', // 추가: "취미", "모각코", "스터디", "프로젝트" 중 하나
    badges: [
      { type: 'status', label: '개설중' },
      { type: 'date', label: '2025년 2월 11일' },
      { type: 'time', label: '17:30' },
    ],
    currentPeople: 18,
    maxPeople: 20,
    imageUrl: '',
  },
  {
    id: 2,
    title: '주말 러닝 모임',
    location: '부산 수영구 광안리해변로',
    category: '취미',
    badges: [
      { type: 'status', label: '신청가능' },
      { type: 'date', label: '2025년 3월 2일' },
      { type: 'time', label: '09:00' },
    ],
    currentPeople: 5,
    maxPeople: 10,
    imageUrl:
      'https://helpx.adobe.com/content/dam/help/en/photoshop/using/quick-actions/remove-background-before-qa1.png',
  },
  {
    id: 3,
    title: '디자인 스터디',
    location: '서울 강남구 테헤란로 427',
    category: '스터디',
    badges: [
      { type: 'status', label: '마감임박' },
      { type: 'date', label: '2025년 3월 5일' },
      { type: 'time', label: '19:00' },
    ],
    currentPeople: 19,
    maxPeople: 20,
    imageUrl:
      'https://helpx.adobe.com/content/dam/help/en/photoshop/using/quick-actions/remove-background-before-qa1.png',
  },
  {
    id: 4,
    title: 'React 모각코',
    location: '온라인',
    category: '모각코',
    badges: [
      { type: 'status', label: '개설중' },
      { type: 'date', label: '2025년 4월 10일' },
      { type: 'time', label: '21:00' },
    ],
    currentPeople: 3,
    maxPeople: 10,
    imageUrl:
      'https://helpx.adobe.com/content/dam/help/en/photoshop/using/quick-actions/remove-background-before-qa1.png',
  },
];

function CardExamples() {
  return (
    <div className="overflow-x-auto lg:overflow-x-hidden">
      <div className="flex w-full">
        {popularMeetings.map((meeting, idx) => (
          <VerticalCard
            key={idx}
            title={meeting.title}
            thumbnailUrl={meeting.imageUrl}
            location={meeting.location}
          />
        ))}
      </div>
    </div>
  );
}

export default CardExamples;
