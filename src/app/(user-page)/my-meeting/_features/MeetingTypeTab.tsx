'use client';

import { usePathname, useRouter } from 'next/navigation';

const tabBar = [
  { label: '나의 모임', value: 'my', href: '/my-meeting/my?type=created' },
  { label: '찜한 모임', value: 'likes', href: '/my-meeting/likes' },
  { label: '나의 리뷰', value: 'comments', href: '/my-meeting/comments' },
];

const MeetingTypeTab = () => {
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split('/');
  const tab = segments[2] || 'my';

  const activeStyle = 'border-b-2 border-main text-main';

  return (
    <div className="mt-[40px] flex gap-[24px]">
      {tabBar.map((item) => (
        <button
          key={item.value}
          className={`typo-button1 p-4 text-[17px] font-bold text-Cgray500 ${tab === item.value && activeStyle}`}
          onClick={() => router.push(item.href)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default MeetingTypeTab;
