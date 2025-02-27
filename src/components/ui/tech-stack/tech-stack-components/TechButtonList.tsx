import React from 'react';
import { ClickedButtonsState, IconWithComponent } from 'types/techStack';

import TechButton from './TechButton';

interface TechButtonListProps {
  icons: IconWithComponent[];
  clickedButtons: ClickedButtonsState;
  selectedCount: number;
  maxSelections: number;
  onButtonClick: (name: string) => void;
}

const TechButtonList = ({
  icons,
  clickedButtons,
  selectedCount,
  maxSelections,
  onButtonClick,
}: TechButtonListProps): JSX.Element => {
  return (
    <div className="mt-4 rounded-md bg-Cgray200 p-4">
      <div
        className="h-[140px] overflow-y-auto pr-2"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#a0aec0 transparent',
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            width: 4px;
          }
          div::-webkit-scrollbar-track {
            background: transparent;
          }
          div::-webkit-scrollbar-thumb {
            background-color: #a0aec0; /* Cgray500 */
            border-radius: 10px;
          }
          div::-webkit-scrollbar-thumb:hover {
            background-color: #718096;
          }
        `}</style>
        <div className="flex flex-wrap gap-3">
          {icons.map((icon) => (
            <TechButton
              key={icon.name}
              icon={icon.component}
              name={icon.name}
              color={icon.color}
              isClicked={!!clickedButtons[icon.name]}
              isMaxReached={
                selectedCount >= maxSelections && !clickedButtons[icon.name]
              }
              onClick={onButtonClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechButtonList;
