import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import Image from 'next/image';
import type { UserData } from 'types/myMeeting';

const UserItem = ({
  user,
  handleProfileClick,
}: {
  user: UserData;
  handleProfileClick: (user: UserData) => void;
}) => {
  return (
    <div key={user.id} className="flex items-center justify-between gap-4 py-2">
      <div className="flex items-center gap-[6px]">
        <Image
          width={40}
          height={40}
          src={user.profilePic}
          alt="유저 프로필"
          className="h-[40px] w-[40px] rounded-[9.92px]"
        />
        <h3 className="typo-head3 text-Cgray700">{user.name}</h3>
      </div>
      <div className="flex gap-[6px]">
        <Tag variant={user.status} className="w-[49px]" />
        <div>
          <Button
            onClick={() => handleProfileClick(user)}
            variant="outline"
            size="sm"
          >
            프로필 보기
          </Button>
        </div>
      </div>
    </div>
  );
};
export default UserItem;
