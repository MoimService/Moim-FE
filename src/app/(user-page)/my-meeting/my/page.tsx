import Created from '../../components/Created';
import Joined from '../../components/Joined';
import Tab from '../../components/Tab';

export interface Member {
  userId: number;
  profilePic: string;
  name: string;
  memberStatus: 'APPROVED' | 'REJECTED' | 'PENDING' | 'EXPEL';
}

export interface Meeting {
  meetingId: number;
  title: string;
  thumbnail: string;
  location: string;
  memberCount: number;
  maxMember: number;
  isPublic: boolean;
  memberList: Member[];
}

export default function Page({
  searchParams,
}: {
  searchParams: { type: string };
}) {
  const meetings: Meeting[] = [
    {
      meetingId: 16,
      title: '코드잇 스프린트',
      thumbnail: '',
      location: '서울시 양천구 목동',
      memberCount: 1,
      maxMember: 10,
      isPublic: true,
      memberList: [
        {
          userId: 9,
          profilePic:
            'https://deving-bucket.s3.ap-northeast-2.amazonaws.com/profile_img.png',
          name: '강윤지',
          memberStatus: 'APPROVED',
        },
        {
          userId: 1,
          profilePic:
            'https://deving-bucket.s3.ap-northeast-2.amazonaws.com/profile_img.png',
          name: '강윤지',
          memberStatus: 'APPROVED',
        },
        {
          userId: 2,
          profilePic:
            'https://deving-bucket.s3.ap-northeast-2.amazonaws.com/profile_img.png',
          name: '강윤지',
          memberStatus: 'APPROVED',
        },
        {
          userId: 3,
          profilePic:
            'https://deving-bucket.s3.ap-northeast-2.amazonaws.com/profile_img.png',
          name: '강윤지',
          memberStatus: 'APPROVED',
        },
        {
          userId: 4,
          profilePic:
            'https://deving-bucket.s3.ap-northeast-2.amazonaws.com/profile_img.png',
          name: '강윤지',
          memberStatus: 'APPROVED',
        },
      ],
    },
  ];
  const type = searchParams?.type;
  console.log('type: ', type);
  return (
    <div>
      <div className="mt-4 flex flex-col gap-[24px]">
        {/**
         * TODO
         * 추후 해당 부분 수정
         <div className="flex gap-[24px]">
          <h3 className="typo-button1 border-b-2 border-main p-4 text-[17px] font-bold text-main">
            나의 모임
          </h3>
          <h3 className="typo-button1 border-b-2 border-main p-4 text-[17px] font-bold text-main">
            찜한 모임
          </h3>
          <h3 className="typo-button1 border-b-2 border-main p-4 text-[17px] font-bold text-main">
            나의 리뷰
          </h3>
        </div> */}
        <Tab type={type} />
      </div>
      {type === 'created' ? <Created /> : <Joined meetings={meetings} />}
    </div>
  );
}
