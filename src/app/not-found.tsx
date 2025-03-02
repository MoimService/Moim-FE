import Image from 'next/image';

export default function NotFoundPage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center text-white">
      <Image
        className="mb-8"
        src="/cat_profile.png"
        alt="404_image"
        width={120}
        height={120}
      />
      <h1 className="typo-head1 mb-8">존재하지 않는 페이지입니다.</h1>
      <div className="typo-head3 mb-[6px] text-Cgray500">
        찾으시려는 페이지가 존재하지 않거나, 현재 사용할 수 없는 페이지입니다.
      </div>
      <a href="/meeting" className="typo-head4 text-main underline">
        홈으로 돌아가기
      </a>
    </div>
  );
}
