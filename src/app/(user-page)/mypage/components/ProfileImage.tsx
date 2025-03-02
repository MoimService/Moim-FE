'use client';

import EditLogo from '@/assets/icon/editLogo.svg';
import { useToast } from '@/components/common/ToastContext';
import { Button } from '@/components/ui/Button';
import Modal from '@/components/ui/modal/Modal';
import {
  useProfileQuery,
  useUpdateProfileImageMutation,
} from '@/hooks/queries/useMyPageQueries';
import { Pencil } from 'lucide-react';
import { useRef, useState } from 'react';

import SkeletonProfileImage from './skeletons/SkeletonProfileImage';

const ProfileImage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  // 이미지 버전 관리를 위한 상태 (캐시 버스팅용)
  const [imageVersion, setImageVersion] = useState<number>(0);

  // 프로필 데이터 조회 커스텀 훅 사용
  const { data: profileData, isLoading: isProfileLoading } = useProfileQuery();

  // 프로필 이미지 업데이트 커스텀 훅 사용
  const { mutate: updateImage, isPending: isUploading } =
    useUpdateProfileImageMutation();

  // 프로필 이미지 URL에 버전 추가 (필요할 때만)
  const profileImageUrl = profileData?.data?.profilePic
    ? `${profileData.data.profilePic}${imageVersion > 0 ? `?v=${imageVersion}` : ''}`
    : null;

  // 파일 선택 핸들러
  const handleFileSelect = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 키보드 핸들러
  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleFileSelect();
    }
  };

  // 파일 변경 핸들러
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      // 이미지 파일 타입 검증
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }

      // 파일 크기 검증 (5MB 제한)
      if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB 이하여야 합니다.');
        return;
      }

      setSelectedFile(file);

      // 미리보기 URL 생성
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  // 이미지 업로드 핸들러
  const handleConfirm = (): void => {
    if (!selectedFile) {
      setIsModalOpen(false);
      return;
    }

    updateImage(selectedFile, {
      onSuccess: () => {
        // 이미지 버전 증가 (캐시 버스팅)
        setImageVersion((prev) => prev + 1);

        // 상태 초기화
        setSelectedFile(null);
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
          setPreviewUrl(null);
        }
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        // 모달 닫기
        setIsModalOpen(false);
      },
      onError: () => {
        showToast('프로필 이미지 업로드에 실패했습니다.', 'error', {
          duration: 3000,
        });
      },
    });
  };

  // 모달 닫기 시 상태 초기화
  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  if (isProfileLoading) {
    return <SkeletonProfileImage />;
  }
  return (
    <div className="flex flex-col pt-[83px]">
      <div className="typo-head3 text-Cgray700">프로필 이미지</div>
      <div className="flex justify-center gap-[24px] py-[24px]">
        <div className="relative flex h-[163px] w-[163px] items-center justify-center rounded-[20px] border border-Cgray300 bg-Cgray200 md:h-[255px] md:w-[255px]">
          {profileImageUrl ? (
            <img
              src={profileImageUrl}
              alt="프로필 이미지"
              className="h-full w-full rounded-[20px] object-cover"
              key={`profile-image-${imageVersion}`}
            />
          ) : (
            <EditLogo className="text-Cgray700" width={86} height={86} />
          )}
          <div className="absolute bottom-[15px] right-[15px]">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="h-[34px] w-[34px] rounded-full"
              icon={<Pencil />}
            ></Button>
          </div>
        </div>
      </div>

      {/* 파일 입력 (숨김) */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        aria-label="프로필 이미지 선택"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        confirmText={isUploading ? '업로드 중...' : '변경'}
        cancelText="취소"
        modalClassName="w-[343px] md:w-[450px] "
        buttonClassName="pt-0 px-[24px] pb-[24px]"
      >
        <div className="flex flex-col items-center justify-center gap-[16px]">
          <div className="typo-head3 text-Cgray700">프로필 이미지</div>
          <div className="flex justify-center">
            <button
              type="button"
              className="relative flex h-[123px] w-[123px] cursor-pointer items-center justify-center overflow-hidden rounded-[20px] border border-Cgray300 bg-Cgray200 p-0 md:h-[163px] md:w-[163px] lg:h-[203px] lg:w-[203px]"
              onClick={handleFileSelect}
              onKeyDown={handleKeyDown}
              aria-label="프로필 이미지 변경하기"
              disabled={isUploading}
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="이미지 미리보기"
                  className="h-full w-full rounded-[20px] object-cover"
                />
              ) : profileImageUrl ? (
                <img
                  src={profileImageUrl}
                  alt="현재 프로필 이미지"
                  className="h-full w-full rounded-[20px] object-cover"
                />
              ) : (
                <EditLogo className="text-Cgray700" width={86} height={86} />
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 transition-opacity hover:opacity-100 focus:opacity-100">
                <p className="font-medium text-white">클릭하여 이미지 선택</p>
              </div>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileImage;
