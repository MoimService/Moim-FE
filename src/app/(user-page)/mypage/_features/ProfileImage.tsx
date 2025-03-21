'use client';

import EditLogo from '@/assets/icon/editLogo.svg';
import { Button } from '@/components/ui/Button';
import Modal from '@/components/ui/modal/Modal';
import { useUpdateProfileImageMutation } from '@/hooks/mutations/useMyPageMutation';
import { useProfileQuery } from '@/hooks/queries/useMyPageQueries';
import { QUERY_KEYS } from '@/hooks/queries/useMyPageQueries';
import { useQueryClient } from '@tanstack/react-query';
import { Pencil } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import {
  DEFAULT_PROFILE_IMAGE,
  MAX_FILE_SIZE,
} from '../../../../constants/mypage/mypageConstant';
import SkeletonProfileImage from './skeletons/SkeletonProfileImage';

const ProfileImage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileSizeError, setFileSizeError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  // 프로필 데이터 조회
  const { data: profileData, isLoading: isProfileLoading } = useProfileQuery();

  // 프로필 이미지 업데이트
  const { mutate: updateImage, isPending: isUploading } =
    useUpdateProfileImageMutation();

  // 프로필 이미지 URL
  const profileImageUrl = profileData?.data?.profilePic || null;
  const isDefaultImage = profileImageUrl?.includes('default-profile.png');

  // 반응형 화면 크기 감지
  useEffect(() => {
    const checkIsMobile = () => {
      // md 사이즈 기준 (보통 768px)
      setIsMobile(window.innerWidth < 768);
    };

    // 초기 로드 시 체크
    checkIsMobile();

    // 리사이즈 이벤트 리스너 등록
    window.addEventListener('resize', checkIsMobile);

    // 컴포넌트 언마운트 시 정리
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // 파일 선택 핸들러
  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  // 파일 변경 핸들러
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // 이전 미리보기 URL 해제
    if (previewUrl) URL.revokeObjectURL(previewUrl);

    // 새 미리보기 URL 생성
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setSelectedFile(file);

    // 파일 크기 검사
    setFileSizeError(
      file.size > MAX_FILE_SIZE
        ? '이미지 크기가 너무 큽니다. 최대 500KB까지 가능합니다.'
        : null,
    );
  };

  // 이미지 업로드 핸들러
  const handleConfirm = () => {
    if (!selectedFile || fileSizeError) return;

    updateImage(selectedFile, {
      onSuccess: () => {
        // 상태 초기화
        resetImageState();
        // 모달 닫기
        setIsModalOpen(false);
        // 배너 쿼리 무효화 (중요! - 헤더의 프로필 이미지도 업데이트되도록)
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.banner() });
      },
    });
  };

  // 기본 이미지로 변경하는 핸들러
  const handleResetToDefault = async () => {
    try {
      // 기본 이미지 URL을 Blob으로 변환
      const response = await fetch(DEFAULT_PROFILE_IMAGE);
      const blob = await response.blob();

      // 이전 미리보기 URL 해제
      if (previewUrl) URL.revokeObjectURL(previewUrl);

      // 새 미리보기 URL 생성
      const objectUrl = URL.createObjectURL(blob);
      setPreviewUrl(objectUrl);

      // 선택된 파일 설정 (이것이 handleConfirm에서 사용됨)
      const defaultImageFile = new File([blob], 'default-profile.png', {
        type: blob.type,
      });
      setSelectedFile(defaultImageFile);

      // 파일 크기 에러 초기화
      setFileSizeError(null);

      // 여기서 updateImage 호출 제거 - 변경 버튼 클릭할 때만 적용되도록
    } catch (error) {
      console.error('기본 이미지 변경 중 오류 발생:', error);
    }
  };

  // 상태 초기화 함수 (중복 코드 제거)
  const resetImageState = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setFileSizeError(null);
  };

  // 모달 닫기 시 상태 초기화
  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetImageState();
  };

  // 프로필 이미지 클릭 처리
  const handleProfileClick = () => {
    if (isMobile) {
      setIsModalOpen(true);
    }
  };

  if (isProfileLoading) {
    return <SkeletonProfileImage />;
  }

  return (
    <div className="flex flex-col pt-[83px]">
      <div className="typo-head3 text-Cgray700">프로필 이미지</div>
      <div className="flex justify-center gap-[24px] py-[24px]">
        <div
          className={`relative flex h-[163px] w-[163px] items-center justify-center rounded-[20px] border border-Cgray300 bg-Cgray200 md:h-[255px] md:w-[255px] ${isMobile ? 'cursor-pointer hover:opacity-90 active:opacity-75' : ''}`}
          onClick={isMobile ? handleProfileClick : undefined}
          onKeyDown={
            isMobile
              ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleProfileClick();
                  }
                }
              : undefined
          }
          role={isMobile ? 'button' : undefined}
          tabIndex={isMobile ? 0 : undefined}
          aria-label={isMobile ? '프로필 이미지 변경하기' : undefined}
        >
          {profileImageUrl ? (
            <>
              <Image
                src={profileImageUrl}
                alt="프로필 이미지"
                priority
                className="rounded-[20px] object-cover"
                fill
                unoptimized
                sizes="(max-width: 768px) 163px, 255px"
              />
              {/* 모바일에서만 보이는 오버레이 효과 */}
              {isMobile && (
                <div className="absolute inset-0 flex items-center justify-center rounded-[20px] bg-black bg-opacity-30 opacity-0 transition-opacity hover:opacity-100 focus:opacity-100">
                  <p className="font-medium text-white">이미지 변경</p>
                </div>
              )}
            </>
          ) : (
            <>
              <EditLogo className="text-Cgray700" width={86} height={86} />
              {/* 모바일에서만 보이는 오버레이 효과 */}
              {isMobile && (
                <div className="absolute inset-0 flex items-center justify-center rounded-[20px] bg-black bg-opacity-30 opacity-0 transition-opacity hover:opacity-100 focus:opacity-100">
                  <p className="font-medium text-white">이미지 선택</p>
                </div>
              )}
            </>
          )}
          {/* md 사이즈 이상에서만 보이는 편집 버튼 */}
          <div className="absolute bottom-[8px] right-[8px] hidden md:bottom-[15px] md:right-[15px] md:block">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="h-[28px] w-[28px] rounded-full md:h-[34px] md:w-[34px]"
              icon={<Pencil />}
            />
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
        modalClassName="w-[343px] md:w-[450px]"
        buttonClassName="pt-0 px-[24px] pb-[24px]"
        disableConfirm={!!fileSizeError || !selectedFile}
      >
        <div className="flex flex-col items-center justify-center gap-[16px]">
          <div className="flex w-full justify-between">
            <div className="typo-head3 text-Cgray700">프로필 이미지</div>
            <button
              className={`text-[12px] ${
                isDefaultImage && !previewUrl
                  ? 'cursor-not-allowed text-Cgray400 opacity-50'
                  : 'cursor-pointer text-Cgray500 underline hover:text-Cgray700'
              }`}
              onClick={
                isDefaultImage && !previewUrl ? undefined : handleResetToDefault
              }
              disabled={isDefaultImage && !previewUrl}
              aria-disabled={isDefaultImage && !previewUrl}
            >
              {isDefaultImage && !previewUrl
                ? '기본 이미지 적용됨'
                : '기본 이미지로 변경'}
            </button>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className="relative flex h-[123px] w-[123px] cursor-pointer items-center justify-center overflow-hidden rounded-[20px] border border-Cgray300 bg-Cgray200 p-0 md:h-[163px] md:w-[163px] lg:h-[203px] lg:w-[203px]"
              onClick={handleFileSelect}
              onKeyDown={(e) => e.key === 'Enter' && handleFileSelect()}
              aria-label="프로필 이미지 변경하기"
              disabled={isUploading}
            >
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="이미지 미리보기"
                  className="rounded-[20px] object-cover"
                  fill
                  sizes="(max-width: 768px) 123px, (max-width: 1024px) 163px, 203px"
                />
              ) : profileImageUrl ? (
                <Image
                  src={profileImageUrl}
                  alt="현재 프로필 이미지"
                  className="rounded-[20px] object-cover"
                  fill
                  sizes="(max-width: 768px) 123px, (max-width: 1024px) 163px, 203px"
                />
              ) : (
                <EditLogo className="text-Cgray700" width={86} height={86} />
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 transition-opacity hover:opacity-100 focus:opacity-100">
                <p className="font-medium text-white">클릭하여 이미지 선택</p>
              </div>
            </button>
          </div>

          {/* 파일 크기 에러 메시지 */}
          {fileSizeError && (
            <div className="mt-2 text-center text-sm text-warning">
              {fileSizeError}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ProfileImage;
