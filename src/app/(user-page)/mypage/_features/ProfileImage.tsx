'use client';

import EditLogo from '@/assets/icon/editLogo.svg';
import { useToast } from '@/components/common/ToastContext';
import { Button } from '@/components/ui/Button';
import Modal from '@/components/ui/modal/Modal';
import { useUpdateProfileImageMutation } from '@/hooks/mutations/useMyPageMutation';
import { useProfileQuery } from '@/hooks/queries/useMyPageQueries';
import { useQueryClient } from '@tanstack/react-query';
import { Pencil } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';

import { MAX_FILE_SIZE } from '../../../../constants/mypage/mypageConstant';
import SkeletonProfileImage from './skeletons/SkeletonProfileImage';

const ProfileImage = () => {
  const queryClient = useQueryClient(); // 추가: queryClient 가져오기
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileSizeError, setFileSizeError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  // 프로필 데이터 조회
  const { data: profileData, isLoading: isProfileLoading } = useProfileQuery();

  // 프로필 이미지 업데이트
  const { mutate: updateImage, isPending: isUploading } =
    useUpdateProfileImageMutation();

  // 프로필 이미지 URL
  const profileImageUrl = profileData?.data?.profilePic || null;

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
        // 캐시 무효화 및 데이터 다시 가져오기 (중요: 이미지 즉시 갱신)
        queryClient.invalidateQueries({ queryKey: ['profile'] });

        // 상태 초기화
        resetImageState();

        // 모달 닫기
        setIsModalOpen(false);
      },
      onError: () => {
        showToast(
          '프로필 이미지 업로드에 실패했습니다. 다시 시도해 주세요.',
          'error',
          { duration: 3000 },
        );
      },
    });
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

  if (isProfileLoading) {
    return <SkeletonProfileImage />;
  }

  return (
    <div className="flex flex-col pt-[83px]">
      <div className="typo-head3 text-Cgray700">프로필 이미지</div>
      <div className="flex justify-center gap-[24px] py-[24px]">
        <div className="relative flex h-[163px] w-[163px] items-center justify-center rounded-[20px] border border-Cgray300 bg-Cgray200 md:h-[255px] md:w-[255px]">
          {profileImageUrl ? (
            <Image
              src={profileImageUrl}
              alt="프로필 이미지"
              priority
              className="rounded-[20px] object-cover"
              fill
              unoptimized
              sizes="(max-width: 768px) 163px, 255px"
            />
          ) : (
            <EditLogo className="text-Cgray700" width={86} height={86} />
          )}
          <div className="absolute bottom-[15px] right-[15px]">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="h-[34px] w-[34px] rounded-full"
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
          <div className="typo-head3 text-Cgray700">프로필 이미지</div>
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
