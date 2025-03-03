import Chip from '@/components/ui/Chip';

export const PositionSelect = ({
  position,
  setPosition,
}: {
  position: string;
  setPosition: (value: string) => void;
}) => {
  return (
    <div className="flex w-full gap-[8px]">
      <Chip
        className={`flex-1 hover:cursor-pointer`}
        isActive={position === 'Frontend'}
        onClick={() => setPosition('Frontend')}
      >
        프론트엔드
      </Chip>
      <Chip
        className={`flex-1 hover:cursor-pointer`}
        isActive={position === 'Backend'}
        onClick={() => setPosition('Backend')}
      >
        백엔드
      </Chip>
      <Chip
        className={`flex-1 hover:cursor-pointer`}
        isActive={position === 'Designer'}
        onClick={() => setPosition('Designer')}
      >
        디자이너
      </Chip>
    </div>
  );
};
