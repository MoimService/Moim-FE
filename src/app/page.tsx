import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const categories = [
    {
      title: '취미',
      description: '개발 관련 취미 활동을 함께할 동료를 찾아보세요.',
      icon: '🎨',
      color: 'bg-blue',
    },
    {
      title: '스터디',
      description: '함께 성장할 수 있는 개발 스터디를 시작하세요.',
      icon: '📚',
      color: 'bg-green',
    },
    {
      title: '모각코',
      description: '모여서 각자 코딩하며 집중력을 높여보세요.',
      icon: '💻',
      color: 'bg-red',
    },
    {
      title: '사이드 프로젝트',
      description: '실무 경험을 쌓을 수 있는 사이드 프로젝트를 찾아보세요.',
      icon: '🚀',
      color: 'bg-solid',
    },
  ];

  const featuredGroups = [
    {
      title: 'Next.js 스터디 그룹',
      category: '스터디',
      members: 8,
      maxMembers: 10,
      location: '온라인',
      imageUrl: '/api/placeholder/300/160',
    },
    {
      title: '주말 모각코 모임',
      category: '모각코',
      members: 12,
      maxMembers: 20,
      location: '서울 강남',
      imageUrl: '/api/placeholder/300/160',
    },
    {
      title: 'AI 챗봇 프로젝트',
      category: '사이드 프로젝트',
      members: 4,
      maxMembers: 6,
      location: '온라인/오프라인',
      imageUrl: '/api/placeholder/300/160',
    },
  ];

  return (
    <div className="min-h-screen bg-BG text-white">
      {/* 헤더바는 이미 준비되어 있음 */}

      {/* Hero Section */}
      <section className="relative mt-20 bg-Cgray100 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="relative z-10 max-w-2xl">
            <h2 className="typo-head1 mb-4 text-white">
              개발자를 위한 <span className="text-main">커뮤니티</span>
            </h2>
            <p className="typo-body1 mb-8 text-Cgray700">
              함께 성장하고 배울 개발자 친구들을 만나보세요. 취미 활동부터
              사이드 프로젝트까지, 다양한 모임에 참여할 수 있습니다.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <button className="typo-button1 rounded-full bg-main px-6 py-3 text-white transition-opacity hover:opacity-90">
                모임 탐색하기
              </button>
              <button className="typo-button1 rounded-full border border-main px-6 py-3 text-main transition-colors hover:bg-main hover:text-white">
                모임 만들기
              </button>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-main/10 to-transparent"></div>
      </section>

      {/* Categories Section */}
      <section className="bg-BG py-16">
        <div className="container mx-auto px-4">
          <h2 className="typo-head2 mb-8 text-center">카테고리</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className="rounded-xl border border-Cgray300 bg-BG_2 p-6 transition-shadow hover:shadow-lg"
              >
                <div
                  className={`${category.color} mb-4 flex h-12 w-12 items-center justify-center rounded-full`}
                >
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <h3 className="typo-head3 mb-2">{category.title}</h3>
                <p className="typo-body2 text-Cgray700">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Groups */}
      <section className="bg-Cgray200 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="typo-head2">인기 모임</h2>
            <Link
              href="/groups"
              className="typo-button2 text-main hover:underline"
            >
              더 보기 →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredGroups.map((group, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl border border-Cgray300 bg-BG_2 transition-shadow hover:shadow-lg"
              >
                <div className="relative h-40 bg-Cgray300">
                  <Image
                    src={group.imageUrl}
                    alt={group.title}
                    width={300}
                    height={160}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute right-2 top-2 rounded-full bg-BG_2 px-3 py-1">
                    <span className="typo-caption1">{group.category}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="typo-head3 mb-2">{group.title}</h3>
                  <p className="typo-caption1 mb-4 text-Cgray700">
                    {group.location}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="typo-caption1 text-Cgray700">
                      멤버 {group.members}/{group.maxMembers}
                    </div>
                    <button className="typo-button2 text-main hover:underline">
                      참가하기
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-main/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="typo-head2 mb-4">나만의 개발자 모임을 시작해보세요</h2>
          <p className="typo-body1 mx-auto mb-8 max-w-2xl text-Cgray700">
            취미, 스터디, 모각코, 사이드 프로젝트 등 다양한 주제로 모임을 만들고
            함께할 개발자들을 찾아보세요.
          </p>
          <button className="typo-button1 rounded-full bg-main px-8 py-3 text-white transition-opacity hover:opacity-90">
            모임 생성하기
          </button>
        </div>
      </section>

      {/* Bottom Banner */}
      <section className="bg-Cgray300 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div>
              <h3 className="typo-head3 mb-2">DEVING과 함께 성장하세요</h3>
              <p className="typo-body2 text-Cgray700">
                개발자 커뮤니티에서 함께 성장할 동료를 찾아보세요.
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/login"
                className="typo-button2 rounded-full bg-main px-6 py-2 text-white transition-opacity hover:opacity-90"
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className="typo-button2 rounded-full border border-main px-6 py-2 text-main transition-colors hover:bg-main hover:text-white"
              >
                회원가입
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-BG_2 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between lg:flex-row">
            <div className="mb-6 flex items-center gap-2 lg:mb-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-main">
                <span className="typo-head3 text-white">D</span>
              </div>
              <span className="typo-body1">DEVING</span>
            </div>

            <div className="mb-6 flex gap-8 lg:mb-0">
              <Link
                href="/terms"
                className="typo-body2 text-Cgray700 transition-colors hover:text-white"
              >
                이용약관
              </Link>
              <Link
                href="/privacy"
                className="typo-body2 text-Cgray700 transition-colors hover:text-white"
              >
                개인정보처리방침
              </Link>
              <Link
                href="/contact"
                className="typo-body2 text-Cgray700 transition-colors hover:text-white"
              >
                문의하기
              </Link>
            </div>

            <p className="typo-caption2 text-Cgray500">
              © 2025 DEVING. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
