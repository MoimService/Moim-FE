'use client';

import Dropdown from '@/components/common/Dropdown';
import { useChangePublic } from '@/hooks/mutations/useMyMeetingMutation';

const PublicDropdown = ({
  isPublic,
  meetingId,
}: {
  isPublic: boolean;
  meetingId: number;
}) => {
  const { mutate } = useChangePublic(meetingId);

  const filterAreaOptions = [
    { value: 'true', label: '공개', onSelect: () => mutate(true) },
    { value: 'false', label: '비공개', onSelect: () => mutate(false) },
  ];

  return (
    <div className="flex w-[120px] items-center">
      <Dropdown
        options={filterAreaOptions}
        trigger={isPublic ? '공개' : '비공개'}
        className="h-[40px] md:h-[46px]"
        contentClassName=""
        variant="icon"
      />
    </div>
  );
};
export default PublicDropdown;
