import { Button } from '@/components/ui/Button';

const ReviewInput = () => {
  return (
    <div className="rounded-[24px] border border-Cgray300 px-[24px] py-[32px]">
      <h3 className="typo-head3 text-Cgray800">리뷰 작성</h3>
      <div>별점</div>
      <div className="flex h-[100px] gap-[16px]">
        <textarea
          className="typo-button1 h-full flex-1 resize-none rounded-[12px] bg-Cgray200 px-[16px] py-[14px] text-Cgray500 placeholder:text-Cgray400"
          placeholder="남겨주신 리뷰는 프로그램 운영 및 다른 회원 분들께 큰 도움이 됩니다."
        />
        <Button className="h-full w-[88px]">등록하기</Button>
      </div>
    </div>
  );
};

export default ReviewInput;
