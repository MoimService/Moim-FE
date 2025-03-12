import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="">
      {/* 메인 히어로 섹션 */}
      <main className="md:h-[1085px] lg:h-[1168px] lg:pt-[83px]">
        <h1 className="flex justify-center overflow-hidden whitespace-nowrap pt-[120px] text-center text-[32px] font-semibold leading-[41px] text-solid md:pt-[191px] md:text-[56px] md:leading-[90px] lg:pt-[191px] lg:text-[72px] lg:leading-[90px]">
          개발자와 디자이너의 공간,
          <br />
          Deving에서 함께해요!
        </h1>
        <div className="flex justify-center py-[60px] md:px-[48px] md:py-[124px] lg:px-[115px] lg:pb-[140px] lg:pt-[124px]">
          <div className="h-[450px] w-full bg-Cgray300"></div>
        </div>
      </main>

      {/* 섹션 1: 성장하는 모임 */}
      <section className="flex flex-col gap-[48px] py-[65px] md:px-[48px] md:py-[44px] lg:flex-row lg:px-[115px] lg:py-[162px]">
        <div className="w-full">
          <img
            src="/section1.png"
            alt="코드만큼 성장하는 모임"
            className="h-[220px] w-full object-cover md:h-[436px] md:rounded-[10px] lg:h-[436px]"
          />
        </div>
        <div className="flex w-full flex-col gap-[24px] overflow-hidden whitespace-nowrap px-[16px] md:px-0 lg:justify-center lg:pl-[110px]">
          <h2 className="typo-head2 text-Cgray800 md:text-[42px] md:font-extrabold md:leading-[54px] lg:text-[42px] lg:leading-[54px]">
            코드만큼 성장하는 모임,
            <br />
            지금 시작하세요!
          </h2>
          <div className="typo-head4 text-Cgray700 md:text-[20px] md:font-semibold md:leading-[28px] lg:text-[20px] lg:font-semibold lg:leading-[28px]">
            스터디/모각코/사이드프로젝트/취미까지
            <br />
            다양한 모임을 원하는 기술스택으로 필터링 해보세요!
          </div>
        </div>
      </section>
      {/* 섹션 2: 기능 소개 */}
      <section className="flex flex-col-reverse gap-[48px] py-[65px] md:px-[48px] md:py-[44px] lg:flex-row lg:px-[115px] lg:py-[162px]">
        <div className="flex w-full flex-col gap-[24px] overflow-hidden whitespace-nowrap px-[16px] md:px-0 lg:justify-center">
          <h2 className="typo-head2 text-Cgray800 md:text-[42px] md:font-extrabold md:leading-[54px] lg:text-[42px] lg:leading-[54px]">
            모임 스타일에 맞게
            <br />
            모임을 개설할 수 있어요!
          </h2>
          <div className="typo-head4 text-Cgray700 md:text-[20px] md:font-semibold md:leading-[28px] lg:text-[20px] lg:font-semibold lg:leading-[28px]">
            신청자 정보를 확인하고 승인할 수 있어요.
            <br />
            모임 안에서 서로의 정보를 파악하고 교류를 시작하세요!
          </div>
        </div>
        <div className="flex w-full justify-end">
          <img
            src="/section2.png"
            alt="코드만큼 성장하는 모임"
            className="h-[220px] w-full object-cover md:h-[436px] md:rounded-[10px] lg:h-[436px]"
          />
        </div>
      </section>

      {/* 섹션 3: CTA */}
      <section className="flex flex-col items-center gap-[40px] py-[103px] md:gap-[60px] md:py-[273px] lg:gap-[60px] lg:py-[273px]">
        <div>
          <h2 className="typo-head2 text-center text-white md:text-[42px] md:leading-[54px] lg:text-[42px] lg:leading-[54px]">
            DEVING에서
            <br />
            당신의 모임을 바로 시작하세요!
          </h2>
        </div>
        <div className="">
          <Button className="">지금 시작하기</Button>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="flex flex-col items-center gap-[32px] px-[24px] pb-[40px] pt-[60px] md:px-[48px] md:pb-[60px] md:pt-[66px] lg:px-[230px] lg:pb-[80px]">
        <div className="flex gap-[8px]">
          <img src="/landingLogo.svg" alt="landingLogo" />
          <img src="/deving.svg" alt="DEVING" />
        </div>
        <div className="text-[13px] text-Cgray500">
          Copyright @ 2025 DEVING All Rights Reserved
        </div>
        <div className="w-full border border-Cgray200"></div>
        <div className="flex gap-2">
          <img src="/github.svg" alt="GITHUB" />
          <img src="/notion.svg" alt="NOTION" />
        </div>
      </footer>
    </div>
  );
}
