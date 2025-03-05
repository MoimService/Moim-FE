import SkeletonBasic from '../../../../components/ui/SkeletonBasic';
import ContentLabel from '../ContextLabel';

const SkeletonMeetingInfo = () => {
  return (
    <div className="">
      <div className="flex flex-col gap-[24px]">
        <div className="flex items-center gap-[8px]">
          {/* <div className="h-[14px] w-[2px] bg-Cgray700" /> */}
          <ContentLabel>모임 설명</ContentLabel>
          {/* <h3 className="typo-head3 text-Cgray700">모임 설명</h3> */}
        </div>
        <div className="flex flex-col gap-[8px]">
          <SkeletonBasic className="w-[150px]" />
          <SkeletonBasic className="w-[250px]" />
          <SkeletonBasic />
          <SkeletonBasic className="w-[220px]" />
        </div>
        <SkeletonBasic className="h-[200px] w-full" />
      </div>
    </div>
  );
};

export default SkeletonMeetingInfo;
