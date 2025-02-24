const MeetingInfo = () => {
  return (
    <div className="px-[32px] py-[16px]">
      <div className="flex flex-col gap-[24px] px-[16px]">
        <div className="flex items-center gap-[8px]">
          <div className="h-[14px] w-[2px] bg-Cgray700" />
          <h3 className="typo-head3 text-Cgray700">모임 설명</h3>
        </div>
        <div className="flex flex-col gap-[8px]">
          <div className="flex gap-[8px]">
            <p className="typo-head4 w-[56px] text-main">장소</p>
            <p className="typo-body1 text-Cgray700">
              서울 성동구 서울숲길 17 공원
            </p>
          </div>
          <div className="flex gap-[8px]">
            <p className="typo-head4 w-[56px] text-main">날짜</p>
            <p className="typo-body1 text-Cgray700">2025년 2월 11일</p>
          </div>
          <div className="flex gap-[8px]">
            <p className="typo-head4 w-[56px] text-main">모집정원</p>
            <p className="typo-body1 text-Cgray700">20명</p>
          </div>
        </div>
        <p className="typo-body1 text-Cgray800">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>
    </div>
  );
};

export default MeetingInfo;
