// 'use client';

// import Dropdown from '@/components/common/Dropdown';
// import { Button } from '@/components/ui/Button';
// import HorizonCard from '@/components/ui/HorizonCard';
// import { Tag } from '@/components/ui/Tag';
// import Modal from '@/components/ui/modal/Modal';
// import Image from 'next/image';
// import { useState } from 'react';

// import { Meeting, Member } from '../my-meeting/my/page';
// import ModalProfile from './ModalProfile';
// import ModalUserList from './ModalUserList';

// const CardRightSection = ({
//   memberList,
//   isPublic,
//   className,
// }: {
//   memberList: Member[];
//   isPublic: boolean;
//   className?: string;
// }) => {
//   const [selectedFilter, setSelectedFilter] = useState(
//     isPublic ? '공개' : '비공개',
//   );
//   const [isUserListModalOpen, setIsUserListModalOpen] = useState(false);
//   const handleConfirm = () => {
//     setIsUserListModalOpen(false);
//   };
//   const filterAreaOptions = [
//     { value: 'true', label: '공개' },
//     { value: 'false', label: '비공개' },
//   ];

//   const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState(false);

//   const handleSecondModalConfirm = () => {
//     // 가입 확인 api 연동
//     setIsUserProfileModalOpen(false);
//   };

//   const handleSecondModalCancel = () => {
//     // 가입 거절 api 연동
//     setIsUserProfileModalOpen(false);
//   };
//   return (
//     <div className={`flex w-full gap-[24px] px-4 lg:w-[518px] ${className}`}>
//       <div className="hidden flex-col justify-center gap-[16px] lg:flex">
//         <h3 className="typo-head3  text-main">참가 중인 멤버</h3>
//         <div className="h-[172px] overflow-y-auto">
//           {memberList.map((member: Member) => (
//             <div key={member.userId} className="flex items-center py-[8px]">
//               <Image
//                 src={member.profilePic}
//                 alt="맴버 프로필"
//                 width={40}
//                 height={40}
//                 className="rounded-[9.92px] "
//               />
//               <p className="typo-head3 w-[114px] p-[6px] text-Cgray700">
//                 {member.name}
//               </p>
//               <div className="flex h-[40px] gap-[6px]">
//                 <Tag variant={member.memberStatus} className="w-[49px]" />
//                 <Button
//                   variant={'outline'}
//                   className="h-[40px] w-[93px]"
//                   onClick={() => setIsUserProfileModalOpen(true)}
//                 >
//                   프로필보기
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <Button
//         variant="outline"
//         className="flex h-[40px] flex-1 md:h-[46px] lg:hidden"
//         onClick={() => setIsUserListModalOpen(true)}
//       >
//         맴버 명단 보기
//       </Button>
//       <div className="flex w-[120px] items-center">
//         <Dropdown
//           options={filterAreaOptions}
//           trigger={selectedFilter}
//           onChange={setSelectedFilter}
//           className="h-[40px] md:h-[46px]"
//           contentClassName=""
//           variant="icon"
//         />
//       </div>
//       <Modal
//         isOpen={isUserProfileModalOpen}
//         onClose={handleSecondModalCancel}
//         onConfirm={handleSecondModalConfirm}
//         confirmText="가입승인"
//         cancelText="가입거절"
//         modalClassName="w-[450px] overflow-hidden bg-BG_2"
//       >
//         <ModalProfile />
//       </Modal>
//       <Modal
//         isOpen={isUserListModalOpen}
//         onClose={() => setIsUserListModalOpen(false)}
//         onConfirm={handleConfirm}
//         showOnly
//         modalClassName="h-[590px] w-[520px] overflow-y-auto"
//       >
//         <ModalUserList
//           setIsUserProfileModalOpen={setIsUserProfileModalOpen}
//           setIsUserListModalOpen={setIsUserListModalOpen}
//         />
//       </Modal>
//     </div>
//   );
// };

// const Joined = ({ meetings }: { meetings: Meeting[] }) => {
//   return (
//     <div className="bg-red">
//       {meetings.map((meeting) => {
//         return (
//           <div key={meeting.meetingId}>
//             {/* 데스크탑 */}
//             <div className="hidden lg:flex">
//               <HorizonCard
//                 key={meeting.meetingId}
//                 title={meeting.title}
//                 thumbnailUrl={meeting.thumbnail}
//                 location={meeting.location}
//                 total={meeting.maxMember}
//                 value={meeting.memberCount}
//                 className="flex-row"
//               >
//                 <CardRightSection
//                   memberList={meeting.memberList}
//                   isPublic={meeting.isPublic}
//                   className="hidden lg:flex"
//                 />
//               </HorizonCard>
//             </div>

//             {/* 태블릿 */}
//             <div className="hidden flex-col md:flex lg:hidden">
//               <HorizonCard
//                 key={meeting.meetingId}
//                 title={meeting.title}
//                 thumbnailUrl={meeting.thumbnail}
//                 location={meeting.location}
//                 total={meeting.maxMember}
//                 value={meeting.memberCount}
//                 thumbnailHeight={160}
//                 thumbnailWidth={160}
//                 className=""
//               />
//               <CardRightSection
//                 memberList={meeting.memberList}
//                 isPublic={meeting.isPublic}
//                 className="flex lg:hidden"
//               />
//             </div>

//             {/* 모바일 */}
//             <div className="flex flex-col md:hidden">
//               <HorizonCard
//                 key={meeting.meetingId}
//                 title={meeting.title}
//                 thumbnailUrl={meeting.thumbnail}
//                 location={meeting.location}
//                 total={meeting.maxMember}
//                 value={meeting.memberCount}
//                 thumbnailHeight={80}
//                 thumbnailWidth={80}
//                 className=""
//               />
//               <CardRightSection
//                 memberList={meeting.memberList}
//                 isPublic={meeting.isPublic}
//                 className="flex lg:hidden"
//               />
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };
// export default Joined;
