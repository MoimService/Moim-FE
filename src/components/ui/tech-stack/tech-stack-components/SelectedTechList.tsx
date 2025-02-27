import React from 'react';

import SelectedTechButton from './SelectedTechButton';

interface SelectedTechListProps {
  selectedNames: string[];
  getIconColor: (name: string) => string;
  onRemove: (name: string) => void;
}

const SelectedTechList = ({
  selectedNames,
  getIconColor,
  onRemove,
}: SelectedTechListProps): JSX.Element => {
  if (selectedNames.length === 0) {
    return <div className="min-h-8"></div>;
  }

  return (
    <div className="min-h-8">
      <div className="bg-gray-102 mb-2 flex flex-col gap-2 rounded-md">
        <div className="flex flex-wrap gap-2">
          {selectedNames.map((name) => (
            <SelectedTechButton
              key={name}
              name={name}
              color={getIconColor(name)}
              onRemove={onRemove}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectedTechList;
