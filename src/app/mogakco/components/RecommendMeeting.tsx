'use client';

import HorizonCard from '@/components/ui/HorizonCard';
import VerticalCard from '@/components/ui/VerticalCard';

const meetingDummyData = [
  {
    meetingId: 1,
    title: 'JavaScript Study Group',
    thumbnail:
      'https://helpx.adobe.com/content/dam/help/en/photoshop/using/quick-actions/remove-background-before-qa1.png',
    location:
      'Seoul Seoul Seoul Seoul Seoul Seoul Seoul Seoul Seoul Seoul Seoul Seoul Seoul Seoul Seoul Seoul Seoul Seoul Seoul Seoul Seoul Seoul Seoul Seoul ',
    memberCount: 5,
    maxMember: 10,
    isLike: true,
  },
  {
    meetingId: 2,
    title: 'React Dev Meetup',
    thumbnail:
      'https://helpx.adobe.com/content/dam/help/en/photoshop/using/quick-actions/remove-background-before-qa1.png',
    location: 'Busan',
    memberCount: 8,
    maxMember: 15,
    isLike: false,
  },
  {
    meetingId: 3,
    title: 'Next.js Workshop',
    thumbnail:
      'https://helpx.adobe.com/content/dam/help/en/photoshop/using/quick-actions/remove-background-before-qa1.png',
    location: 'Incheon',
    memberCount: 3,
    maxMember: 8,
    isLike: true,
  },
  {
    meetingId: 4,
    title:
      'Frontend Performance Optimization Frontend Performance Optimization Frontend Performance Optimization ',
    thumbnail: '',
    location: 'Daejeon',
    memberCount: 6,
    maxMember: 12,
    isLike: false,
  },
];

const RecommendMeeting = () => {
  return (
    <>
      <div className="typo-head1 mb-6 px-4 text-Cgray800">
        {/* TODO: 닉네임으로 변경 */}
        어쩌구의 추천 모임
      </div>

      <div className="hidden overflow-hidden overflow-x-auto md:flex lg:flex">
        {meetingDummyData.map((meeting) => (
          <VerticalCard
            key={meeting.meetingId}
            title={meeting.title}
            thumbnailUrl={meeting.thumbnail}
            location={meeting.location}
            isLike={meeting.isLike}
            total={meeting.maxMember}
            value={meeting.memberCount}
          />
        ))}
      </div>

      <div className="flex flex-col md:hidden lg:hidden">
        {meetingDummyData.map((meeting) => (
          <HorizonCard
            className="h-[130px]"
            key={meeting.meetingId}
            thumbnailHeight={80}
            thumbnailWidth={80}
            title={meeting.title}
            thumbnailUrl={meeting.thumbnail}
            location={meeting.location}
            isLike={meeting.isLike}
            total={meeting.maxMember}
            value={meeting.memberCount}
          />
        ))}
      </div>
    </>
  );
};

export default RecommendMeeting;
