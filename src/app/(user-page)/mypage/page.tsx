import MyPageClient from './MyPageClient';
import ProfileImage from './_features/ProfileImage';

export default function MyPage() {
  return (
    <div className="flex flex-col px-[24px] pb-[100px]">
      <div className="md:mb-8">
        <ProfileImage />
      </div>
      <MyPageClient />
    </div>
  );
}
