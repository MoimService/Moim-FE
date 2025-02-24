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

function CardExamples() {
  return (
    <div className="overflow-x-auto lg:overflow-x-hidden">
      <div className="flex w-full">
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
      <div className="flex w-full flex-col gap-3">
        {meetingDummyData.map((meeting) => (
          <HorizonCard
            key={meeting.meetingId}
            title={meeting.title}
            thumbnailUrl={meeting.thumbnail}
            location={meeting.location}
            isLike={meeting.isLike}
            total={meeting.maxMember}
            value={meeting.memberCount}
          ></HorizonCard>
        ))}
      </div>
    </div>
  );
}

export default CardExamples;
