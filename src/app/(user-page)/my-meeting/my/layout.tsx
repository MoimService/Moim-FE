export default function MyMeetingLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="relative">
      {children}
      {modal}
    </div>
  );
}
