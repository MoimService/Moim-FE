const ContentLabel = ({ children }: { children: string }) => {
  return (
    <div className="flex items-center gap-[8px]">
      <div className="h-[14px] w-[2px] bg-Cgray700" />
      <h3 className="typo-head3 text-Cgray700">{children}</h3>
    </div>
  );
};

export default ContentLabel;
