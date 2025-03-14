'use client';

import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

interface TabProps {
  type: string;
  tabList: {
    label: string;
    value: string;
    url: string;
  }[];
}

const Tab = ({ type, tabList }: TabProps) => {
  const router = useRouter();

  return (
    <div className="flex gap-2">
      {tabList.map((item) => (
        <Button
          key={item.value}
          className="w-fit px-4"
          variant={type === item.value ? 'solid' : 'default'}
          onClick={() => router.push(`${item.url}?type=${item.value}`)}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
};
export default Tab;
