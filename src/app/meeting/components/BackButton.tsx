'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();

  return (
    <div className="mt-[40px] hover:cursor-pointer">
      <ArrowLeft
        className="h-[24px] w-[24px] text-Cgray700"
        onClick={() => router.back()}
      />
    </div>
  );
};
export default BackButton;
