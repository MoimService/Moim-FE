import RatingStars from '@/components/common/review/RatingStars';
import { getRelativeTime } from '@/util/date';
import Image from 'next/image';
import { Comment } from 'service/api/comment';

interface ReviewItemProps {
  className?: string;
  comment: Comment;
  isMine?: boolean;
}

const ReviewItem = ({
  comment,
  isMine = false,
  className,
}: ReviewItemProps) => {
  return (
    <div
      className={`flex flex-col gap-[16px] py-[16px] sm:p-[24px] ${className}`}
    >
      <div
        className={`flex items-center ${isMine ? 'justify-end' : 'justify-between'}`}
      >
        {!isMine && comment.profilePic && comment.userName && (
          <div className="flex items-center gap-[8px]">
            <Image
              src={comment.profilePic}
              width={40}
              height={40}
              className="rounded-[9.92px]"
              alt="유저 프로필 이미지"
            />
            <h3 className="typo-head3 text-Cgray800">{comment.userName}</h3>
          </div>
        )}
        <RatingStars rating={Number(comment.score)} size={24} />
      </div>
      <div className="h-[100px]">
        <p className="text-Cgray500">{comment.content}</p>
      </div>
      <div className="flex justify-end">
        <p className="typo-body2 text-Cgray500">
          {getRelativeTime(comment.createdAt)}
        </p>
      </div>
    </div>
  );
};

export default ReviewItem;
