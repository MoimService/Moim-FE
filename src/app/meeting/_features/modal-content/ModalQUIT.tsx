'use client';

const ModalQuit = () => {
  return (
    <div className="typo-head3 flex w-full flex-col items-center justify-center gap-4">
      <h3 className="typo-head3 text-Cgray800">모임 탈퇴</h3>
      <div className="flex flex-col items-center">
        <p className="typo-body1 text-Cgray700">참여 중인 모임입니다.</p>
        <p className="typo-body1 text-Cgray700">정말로 탈퇴할까요?</p>
      </div>
    </div>
  );
};
export default ModalQuit;
