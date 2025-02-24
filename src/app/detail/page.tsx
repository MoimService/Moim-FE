import MeetingInfo from './components/MeetingInfo';
import UserInfo from './components/UserInfo';

export default function Detail() {
  return (
    <div>
      <div>모임 헤더 - 한나님</div>
      {/* <div>유저 정보</div> */}
      <UserInfo />
      {/* <div>모임 상세 정보</div> */}
      <MeetingInfo />
      <div>리뷰 평점 - 윤재님</div>
      <div>리뷰 작성 폼</div>
      <div>리뷰 리스트</div>
    </div>
  );
}
