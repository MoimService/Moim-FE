import { useState } from 'react';
import React from 'react';

import { Button } from '../../../components/ui/Button';
import Modal from '../../../components/ui/modal/Modal';

interface UserData {
  id: number;
  name: string;
  status: '대기' | '승인' | '거절' | '강퇴';
  introduction: string;
}

const mockUsers: UserData[] = [
  {
    id: 1,
    name: '김민수',
    status: '승인',
    introduction:
      '안녕하세요! 웹 개발자 김민수입니다. React와 TypeScript를 주로 사용합니다.',
  },
  {
    id: 2,
    name: '이지원',
    status: '대기',
    introduction: '백엔드 개발자 이지원입니다. Spring과 Node.js를 다룹니다.',
  },
  {
    id: 3,
    name: '박서연',
    status: '거절',
    introduction:
      'UI/UX 디자이너 박서연입니다. 사용자 경험 개선에 관심이 많습니다.',
  },
  {
    id: 4,
    name: '최준호',
    status: '승인',
    introduction:
      '모바일 앱 개발자 최준호입니다. Flutter와 React Native를 사용합니다.',
  },
  {
    id: 5,
    name: '정다은',
    status: '강퇴',
    introduction:
      '프론트엔드 개발자 정다은입니다. Vue.js와 React를 주로 사용합니다.',
  },
  {
    id: 6,
    name: '강현우',
    status: '승인',
    introduction: '풀스택 개발자 강현우입니다. MERN 스택을 주로 사용합니다.',
  },
  {
    id: 7,
    name: '손미나',
    status: '대기',
    introduction: 'DevOps 엔지니어 손미나입니다. AWS와 Docker를 다룹니다.',
  },
  {
    id: 8,
    name: '윤태호',
    status: '거절',
    introduction: '게임 개발자 윤태호입니다. Unity와 C#을 주로 사용합니다.',
  },
  {
    id: 9,
    name: '임수진',
    status: '승인',
    introduction: '데이터 엔지니어 임수진입니다. Python과 SQL을 다룹니다.',
  },
  {
    id: 10,
    name: '한도윤',
    status: '대기',
    introduction:
      '보안 엔지니어 한도윤입니다. 네트워크 보안에 관심이 많습니다.',
  },
];

const Some = () => {
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  const handleSecondModalConfirm = () => {
    setIsSecondModalOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '승인':
        return 'text-green-600';
      case '대기':
        return 'text-yellow-600';
      case '거절':
        return 'text-red-600';
      case '강퇴':
        return 'text-gray-600';
      default:
        return '';
    }
  };

  const handleProfileClick = (user: UserData) => {
    setSelectedUser(user);
    setIsSecondModalOpen(true);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-4 gap-4 p-2 font-semibold">
        <div className="text-white">이름</div>
        <div className="text-white">상태</div>
        <div className="text-white">프로필</div>
      </div>
      <div className="w-full border-t border-white"></div>
      {mockUsers.map((user) => (
        <div
          key={user.id}
          className="grid grid-cols-4 items-center gap-4 border-b pb-2"
        >
          <div className="text-white">{user.name}</div>
          <div className={getStatusColor(user.status)}>{user.status}</div>
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
      ))}

      <Modal
        isOpen={isSecondModalOpen}
        onClose={() => setIsSecondModalOpen(false)}
        onConfirm={handleSecondModalConfirm}
        confirmText="확인"
        cancelText="닫기"
        modalClassName="w-96"
      >
        {selectedUser && (
          <div className="p-4">
            <h2 className="mb-4 text-xl font-bold text-white">
              {selectedUser.name}님의 프로필
            </h2>
            <p className="text-gray-600">{selectedUser.introduction}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Some;
