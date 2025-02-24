import { ArrowLeft } from 'lucide-react';

import CardWarpper from './components/CardWrapper';
import MeetingInfo from './components/MeetingInfo';
import Review from './components/Review';
import UserInfo from './components/UserInfo';

export default function Detail() {
  return (
    <div className="flex flex-col gap-[48px]">
      <div className="mt-[40px]">
        <ArrowLeft className="h-[24px] w-[24px] text-Cgray700" />
      </div>
      <CardWarpper />
      <UserInfo />
      <MeetingInfo />
      <Review />
      <div>리뷰 리스트</div>
    </div>
  );
}
