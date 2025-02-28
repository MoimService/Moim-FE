import FloatingButtonGroup from '@/components/common/FloatingButtonGroup';

import MeetingList from '../components/MeetingList';
import RecommendMeeting from '../components/RecommendMeeting';

function MeetingListPage() {
  return (
    <div className="mb-[130px] mt-[88px]">
      <FloatingButtonGroup />
      <RecommendMeeting />
      <MeetingList />
    </div>
  );
}

export default MeetingListPage;
