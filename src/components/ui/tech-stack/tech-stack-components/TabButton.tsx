import React from 'react';

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  smallText: string;
}

const TabButton = ({
  active,
  onClick,
  children,
  smallText,
}: TabButtonProps): JSX.Element => {
  return (
    <button
      type="button"
      className={`px-2 py-2 font-medium md:px-4 ${
        active
          ? 'border-b-2 border-[#C586C0] text-[#C586C0]'
          : 'hover:text-Cgray500'
      }`}
      onClick={onClick}
    >
      <span className="hidden sm:inline">{children}</span>
      <span className="sm:hidden">{smallText}</span>
    </button>
  );
};

export default TabButton;
