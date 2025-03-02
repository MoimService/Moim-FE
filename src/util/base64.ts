/**
 * 이미지 파일을 Base64 문자열로 변환
 * @param file 변환할 이미지 파일
 * @returns 파일명과 Base64 인코딩 문자열이 포함된 객체
 */
export const convertImageToBase64 = async (
  file: File,
): Promise<{ name: string; base64: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result as string;
      // "data:image/jpeg;base64," 같은 접두사 제거
      const base64 = base64String.split(',')[1];

      resolve({
        name: file.name,
        base64,
      });
    };

    reader.onerror = () => {
      reject(new Error('이미지를 Base64로 변환하는 중 오류가 발생했습니다.'));
    };

    reader.readAsDataURL(file);
  });
};

/**
 * 이미지 파일 크기 검증
 * @param file 검증할 이미지 파일
 * @param maxSizeMB 최대 허용 크기 (MB 단위)
 * @returns 파일이 허용 크기 이내인지 여부
 */

export const validateImageSize = (
  file: File,
  maxSizeMB: number = 5,
): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

/**
 * 이미지 파일 형식 검증
 * @param file 검증할 이미지 파일
 * @returns 파일이 허용된 이미지 형식인지 여부
 */
export const validateImageType = (file: File): boolean => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  return allowedTypes.includes(file.type);
};
