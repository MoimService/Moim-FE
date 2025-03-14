'use client';

import { Dispatch, SetStateAction } from 'react';

const ModalRegisterInput = ({
  value,
  setValue,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-[24px]">
      <h3 className="typo-head3 text-Cgray800">
        마이 페이지에 등록된 정보가 주최자에게 전달됩니다!
      </h3>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        className="typo-button1 h-[120px] w-full resize-none rounded-[12px] bg-Cgray200 px-[16px] py-[14px] text-Cgray500 placeholder:text-Cgray400"
        placeholder="인삿말을 남겨주세요!"
      />
    </div>
  );
};
export default ModalRegisterInput;
