import Description from '@/components/common/Description';
import { Tag } from '@/components/ui/Tag';
import Image from 'next/image';
import { mock } from 'node:test';
import { Dispatch, SetStateAction, useState } from 'react';
import React from 'react';

import { Button } from '../../../components/ui/Button';
import Modal from '../../../components/ui/modal/Modal';
import UserItem from './UserItem';
import Test from './test';

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

const mockUsers: UserData[] = [
  {
    id: 1,
    name: '김민수',
    status: 'APPROVED',
    introduction:
      '안녕하세요! 웹 개발자 김민수입니다. React와 TypeScript를 주로 사용합니다.',
    profilePic:
      'https://deving-bucket.s3.ap-northeast-2.amazonaws.com/profile_img.png',
  },
  {
    id: 2,
    name: '이지원',
    status: 'PENDING',
    introduction: '백엔드 개발자 이지원입니다. Spring과 Node.js를 다룹니다.',
    profilePic:
      'https://deving-bucket.s3.ap-northeast-2.amazonaws.com/profile_img.png',
  },
  {
    id: 3,
    name: '박서연',
    status: 'REJECTED',
    introduction:
      'UI/UX 디자이너 박서연입니다. 사용자 경험 개선에 관심이 많습니다.',
    profilePic:
      'https://deving-bucket.s3.ap-northeast-2.amazonaws.com/profile_img.png',
  },
  {
    id: 4,
    name: '최준호',
    status: 'APPROVED',
    introduction:
      '모바일 앱 개발자 최준호입니다. Flutter와 React Native를 사용합니다.',
    profilePic:
      'https://deving-bucket.s3.ap-northeast-2.amazonaws.com/profile_img.png',
  },
  {
    id: 5,
    name: '정다은',
    status: 'EXPEL',
    introduction:
      '프론트엔드 개발자 정다은입니다. Vue.js와 React를 주로 사용합니다.',
    profilePic:
      'https://deving-bucket.s3.ap-northeast-2.amazonaws.com/profile_img.png',
  },
  {
    id: 6,
    name: '강현우',
    status: 'APPROVED',
    introduction: '풀스택 개발자 강현우입니다. MERN 스택을 주로 사용합니다.',
    profilePic:
      'https://deving-bucket.s3.ap-northeast-2.amazonaws.com/profile_img.png',
  },
  {
    id: 7,
    name: '손미나',
    status: 'PENDING',
    introduction: 'DevOps 엔지니어 손미나입니다. AWS와 Docker를 다룹니다.',
    profilePic:
      'https://deving-bucket.s3.ap-northeast-2.amazonaws.com/profile_img.png',
  },
  {
    id: 8,
    name: '윤태호',
    status: 'REJECTED',
    introduction: '게임 개발자 윤태호입니다. Unity와 C#을 주로 사용합니다.',
    profilePic:
      'https://deving-bucket.s3.ap-northeast-2.amazonaws.com/profile_img.png',
  },
  {
    id: 9,
    name: '임수진',
    status: 'APPROVED',
    introduction: '데이터 엔지니어 임수진입니다. Python과 SQL을 다룹니다.',
    profilePic:
      'https://deving-bucket.s3.ap-northeast-2.amazonaws.com/profile_img.png',
  },
  {
    id: 10,
    name: '한도윤',
    status: 'PENDING',
    introduction:
      '보안 엔지니어 한도윤입니다. 네트워크 보안에 관심이 많습니다.',
    profilePic:
      'https://deving-bucket.s3.ap-northeast-2.amazonaws.com/profile_img.png',
  },
];

const ModalUserList = ({
  setIsUserProfileModalOpen,
  setIsUserListModalOpen,
}: {
  setIsUserProfileModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsUserListModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  const handleProfileClick = (user: UserData) => {
    setSelectedUser(user);
    setIsUserProfileModalOpen(true);
    setIsUserListModalOpen(false);
  };

  return (
    <div className="flex flex-col">
      <h3 className="typo-head3 mb-2 text-main">맴버 리스트</h3>
      {mockUsers.map((user) => (
        <div
          key={user.id}
          className="flex items-center justify-between gap-4 py-2"
        >
          <div className="flex items-center gap-[6px]">
            <Image
              width={40}
              height={40}
              src={user.profilePic}
              alt="유저 프로필"
              className="h-[40px] w-[40px] rounded-[9.92px]"
            />
            <h3 className="typo-head3 text-Cgray700">{user.name}</h3>
          </div>
          <div className="flex gap-[6px]">
            <Tag variant={user.status} className="w-[49px]" />
            <div>
              <Button
                onClick={() => handleProfileClick(user)}
                variant="outline"
                size="sm"
              >
                프로필 보기
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModalUserList;
