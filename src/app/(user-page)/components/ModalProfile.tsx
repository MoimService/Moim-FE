import Description from '@/components/common/Description';
import { Tag } from '@/components/ui/Tag';
import Image from 'next/image';
import { useState } from 'react';
import React from 'react';

import Modal from '../../../components/ui/modal/Modal';

export interface UserData {
  id: number;
  name: string;
  status: 'APPROVED' | 'REJECTED' | 'PENDING' | 'EXPEL';
  introduction: string;
  profilePic: string;
}

const mockUser = {
  userId: 9,
  name: '강윤지',
  profilePic:
    'https://deving-bucket.s3.ap-northeast-2.amazonaws.com/profile_img.png',
  intro: '안녕하세요, 개발자 강윤지입니다. 안녕하세요, 개발자 강윤지입니다.',
  email: 'yunji@naver.com',
  position: 'Frontend',
  skillArray: [],
  gender: '비공개',
  age: '선택 안함',
  location: '선택 안함',
  contactResponse: {
    phone: null,
    github: null,
    kakao: null,
  },
  memberResponse: {
    memberId: 37,
    message: '모임 주최자 입니다',
  },
};

const ModalProfile = () => {
  return (
    <div className="p-4">
      <div className="mb-4 flex gap-4">
        <Image
          width={80}
          height={80}
          src={mockUser.profilePic}
          alt="유저 프로필"
          className="h-[80px] w-[80px] rounded-[16px]"
        />
        <div className="flex flex-col gap-[12px]">
          <h3 className="typo-head3 text-Cgray800">{mockUser.name}</h3>
          <p className="typo-body1 text-Cgray700">{mockUser.intro}</p>
        </div>
      </div>
      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-col gap-2 pl-2">
          <Description label="Email" value={mockUser.email} />
          <Description label="연락처" value={mockUser.contactResponse.phone} />
          <Description
            label="연락처2"
            value={mockUser.contactResponse.github}
          />
          <Description label="연락처3" value={mockUser.contactResponse.kakao} />
        </div>
        <div className="flex flex-col gap-2 pl-2">
          <Description label="포지션" value={mockUser.position} />
          <Description label="기술스택">
            <div className=" flex flex-wrap gap-[6px] text-Cgray500">
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
              <div className="typo-caption1 rounded-[8px] bg-disable px-[8px] py-[4px]">
                자바스크립트
              </div>
            </div>
          </Description>
        </div>
        <div className="flex flex-col gap-2 pl-2">
          <Description label="성별" value={mockUser.gender} />
          <Description label="연령대" value={mockUser.age} />
          <Description label="지역" value={mockUser.location} />
        </div>
        <div className="pl-2">
          <Description label="인삿말" value={mockUser.intro} />
        </div>
      </div>
    </div>
  );
};

export default ModalProfile;
