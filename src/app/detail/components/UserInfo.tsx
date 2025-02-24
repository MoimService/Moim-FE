import Image from 'next/image';

import thumbnail from '../../../assets/thumbnail.png';

const UserInfo = () => {
  return (
    <div className="flex flex-col gap-[16px] p-[16px] px-[32px]">
      <div className="flex items-center gap-[16px]">
        <div className="relative h-[80px] w-[80px] shrink-0">
          <Image
            src={thumbnail}
            fill
            className="object-cover"
            alt="유저 프로필"
          />
        </div>
        <div className="flex flex-col gap-[12px]">
          <h3 className="typo-head3 text-Cgray800">김데빙</h3>
          <p className="typo-body1 text-Cgray700">
            안녕하세요~안녕하세요~안녕하세요~안녕하세요~안녕하세요~안녕하세요~안녕하세요~안녕하세요~안녕하세요~
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-[8px] px-[8px]">
        <div className="flex gap-[8px]">
          <p className="typo-head4 w-[56px] text-main">Email</p>
          <p className="typo-body1 text-Cgray700">codeit@codeit.com</p>
        </div>
        <div className="flex gap-[8px]">
          <p className="typo-head4 w-[56px] text-main">연락처</p>
          <p className="typo-body1 text-Cgray700">010-1234-1234</p>
        </div>
      </div>
      <div className="ml-[8px] flex gap-[6px] text-Cgray500">
        <div className="typo-caption1 rounded-[8px] bg-disable px-[8px] py-[4px]">
          자바스크립트
        </div>
        <div className="typo-caption1 rounded-[8px] bg-disable px-[8px] py-[4px]">
          자바스크립트
        </div>
        <div className="typo-caption1 rounded-[8px] bg-disable px-[8px] py-[4px]">
          자바스크립트
        </div>
        <div className="typo-caption1 rounded-[8px] bg-disable px-[8px] py-[4px]">
          자바스크립트
        </div>
      </div>
    </div>
  );
};
export default UserInfo;
