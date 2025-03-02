export const getDDay = (targetDate: string | Date): string => {
  const today = new Date();
  const target = new Date(targetDate);

  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'D-Day';
  return diffDays > 0 ? `D-${diffDays}` : `D+${Math.abs(diffDays)}`;
};

export const formatDate = (dateString: string | Date): string => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
};

export const getRelativeTime = (dateString: string | Date): string => {
  const targetDate = new Date(dateString);
  const today = new Date();

  const diffTime = today.getTime() - targetDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return '오늘';
  if (diffDays < 7) return `${diffDays}일 전`;

  const diffMonths =
    today.getFullYear() * 12 +
    today.getMonth() -
    (targetDate.getFullYear() * 12 + targetDate.getMonth());

  if (diffMonths < 1) return `${Math.floor(diffDays / 7)}주 전`;
  if (diffMonths < 12) return `${diffMonths}달 전`;

  const diffYears = today.getFullYear() - targetDate.getFullYear();
  return `${diffYears}년 전`;
};
