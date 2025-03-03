import MyPageClient from './MyPageClient';
import ProfileImage from './components/ProfileImage';

export default function MyPage() {
  return (
    <div className="flex flex-col gap-[56px] px-[24px] pb-[300px]">
      <ProfileImage />
      <MyPageClient />
    </div>
  );
}
