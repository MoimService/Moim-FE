'use client';

import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

const tabList = [
  { label: '내가 만든 모임', value: 'created' },
  { label: '내가 참여하고 있는 모임', value: 'joined' },
];

const Tab = ({ type }: { type: string }) => {
  const router = useRouter();

  return (
    <div className="flex gap-2">
      {tabList.map((item) => (
        <Button
          key={item.value}
          className="w-fit px-4"
          variant={type === item.value ? 'solid' : 'default'}
          onClick={() => router.push(`/my-meeting/my?type=${item.value}`)}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
};
export default Tab;
