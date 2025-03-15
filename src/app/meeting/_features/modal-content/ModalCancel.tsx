'use client';

const ModalCancel = () => {
  return (
    <div className="typo-head3 flex w-full flex-col items-center justify-center gap-4">
      <h3 className="typo-head3 text-Cgray800">신청 취소</h3>
      <div>
        <p className="typo-body1 text-Cgray700">승인 대기 중인 모임입니다.</p>
        <p className="typo-body1 text-Cgray700">정말로 신청을 취소할까요?</p>
      </div>
    </div>
  );
};
export default ModalCancel;
