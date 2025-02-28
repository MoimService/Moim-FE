'use client';

import { Button } from '@/components/ui/Button';
import { getProfile } from '@/lib/axios/profileApi';
import { useEffect, useState } from 'react';

const BasicInfo = () => {
  // 사용자 정보 상태
  const [userData, setUserData] = useState({
    name: '',
    intro: '',
    position: '',
    gender: '',
    age: '',
    location: '',
  });

  // 로딩 상태
  const [loading, setLoading] = useState(true);

  // 컴포넌트 마운트 시 사용자 정보 로드
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getProfile();

        // API 응답에서 데이터 설정
        setUserData({
          name: response.data.name || '',
          intro: response.data.intro || '',
          position: response.data.position || '',
          gender: response.data.gender || '',
          age: response.data.age || '',
          location: response.data.location || '',
        });
      } catch (error) {
        console.error('사용자 정보를 불러오는데 실패했습니다:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="mb-6 w-full rounded-[16px] border border-Cgray300 p-[32px]">
      <div className="flex flex-col gap-[32px]">
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="name-input" className="typo-head3 text-Cgray700">
            이름
          </label>
          <input
            id="name-input"
            type="text"
            value={userData.name}
            readOnly
            className="typo-button1 h-[50px] rounded-[8px] border-b border-Cgray300 bg-transparent py-2 pl-[16px] text-Cgray700 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="intro-input" className="typo-head3 text-Cgray700">
            소개글
          </label>
          <textarea
            id="intro-input"
            rows={3}
            value={userData.intro || ''}
            disabled
            className="h-[140px] resize-none rounded-[8px] border-b border-Cgray300 bg-transparent py-2 pl-[16px] text-Cgray700 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="position-input" className="typo-head3 text-Cgray700">
            포지션
          </label>
          <input
            id="position-input"
            type="text"
            value={userData.position}
            readOnly
            className="typo-button1 h-[50px] rounded-[8px] border-b border-Cgray300 bg-transparent py-2 pl-[16px] text-Cgray700 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="gender-input" className="typo-head3 text-Cgray700">
            성별
          </label>
          <input
            id="gender-input"
            type="text"
            value={userData.gender}
            readOnly
            className="typo-button1 h-[50px] rounded-[8px] border-b border-Cgray300 bg-transparent py-2 pl-[16px] text-Cgray700 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="age-input" className="typo-head3 text-Cgray700">
            연령대
          </label>
          <input
            id="age-input"
            type="text"
            value={userData.age}
            readOnly
            className="typo-button1 h-[50px] rounded-[8px] border-b border-Cgray300 bg-transparent py-2 pl-[16px] text-Cgray700 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="area-input" className="typo-head3 text-Cgray700">
            지역
          </label>
          <input
            id="area-input"
            type="text"
            value={userData.location}
            readOnly
            className="typo-button1 h-[50px] rounded-[8px] border-b border-Cgray300 bg-transparent py-2 pl-[16px] text-Cgray700 focus:outline-none"
          />
        </div>
        <Button variant="outline">사용자 정보 변경</Button>
      </div>
    </div>
  );
};

export default BasicInfo;
