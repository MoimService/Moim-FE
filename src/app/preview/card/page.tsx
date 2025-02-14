import { Button } from '@/components/ui/Button';
import {
  Card,
  CardCategory,
  CardContent,
  CardDescription,
  CardFooter,
  CardThumbnail,
  CardTitle,
} from '@/components/ui/Card';
import { CircleUserRound, Heart } from 'lucide-react';

function CardExamples() {
  return (
    <div>
      {/* TODO: 칩버튼, 프로그래스바 추가예정 */}
      <Card imgUrl="https://helpx.adobe.com/content/dam/help/en/photoshop/using/quick-actions/remove-background-before-qa1.png">
        <CardThumbnail />
        <CardContent>
          <CardCategory>1번 카테고리</CardCategory>
          <CardTitle className="flex justify-between">
            <div>코드잇 스프린트</div>
            <Button
              className="h-6 w-6"
              variant="text"
              icon={<Heart className="text-Cgray500" />}
            ></Button>
          </CardTitle>
          <CardDescription>서울 성동구 서울숲길 17 공원</CardDescription>
          <div className="mt-2 flex gap-2 text-white">
            <div>개설 확정</div>
            <div>2025년 2월 11일</div>
            <div>17:30</div>
          </div>
          <div className="mt-2 h-full border-2 border-white"></div>
        </CardContent>
      </Card>

      <Card
        type="horizon"
        imgUrl="https://helpx.adobe.com/content/dam/help/en/photoshop/using/quick-actions/remove-background-before-qa1.png"
      >
        <CardThumbnail></CardThumbnail>
        <CardContent>
          {/* TODO: 칩버튼, 프로그래스바 추가예정 */}
          <CardCategory>1번 카테고리</CardCategory>
          <CardTitle className="flex justify-between">
            <div>코드잇 스프린트</div>
          </CardTitle>
          <CardDescription>서울 성동구 서울숲길 17 공원</CardDescription>
          <div className="mt-2 flex gap-2 text-white">
            <div>개설 확정</div>
            <div>2025년 2월 11일</div>
            <div>17:30</div>
          </div>
          <div className="mt-2 border-2 border-white"></div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="relative w-[318px]">
            {/* 우측 상단 하트 아이콘 */}
            <Button
              className="absolute right-0 h-12 w-12"
              variant="text"
              icon={<Heart className="text-Cgray500" />}
            ></Button>

            {/* 상단 영역: 모임장 / 남은 시간 */}
            <div className="relative mt-[48px] flex items-center justify-between py-6">
              {/* 모임장 정보 */}
              <div className="flex w-[154px] flex-col items-start">
                <span className="typo-head3 text-Cgray500">모임장</span>
                <div className="mt-1 flex h-[41px] items-center">
                  <CircleUserRound className="text-GB mr-2 h-10 w-10 text-Cgray500" />
                  {/* TODO: text type 수정 예정 */}
                  <div className="type-head1 w-[106px] truncate text-Cgray500">
                    밤식이이이이이이이
                  </div>
                </div>
              </div>
              {/* 남은 시간 */}
              <div className="flex w-[154px] flex-col items-start">
                <span className="typo-head3 text-Cgray500">남은 시간</span>
                <div className="text typo-head1 mt-1 flex h-[41px] items-end truncate text-Cgray800">
                  2
                  <span className="typo-button1 relative bottom-1 mx-1">
                    일
                  </span>
                  14
                  <span className="typo-button1 relative bottom-1 ml-1">
                    시간
                  </span>
                </div>
              </div>
            </div>
            {/* 신청하기 버튼 */}
            <Button className="w-[318px]">신청하기</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default CardExamples;
