import MeetingTypeTab from './_features/MeetingTypeTab';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <MeetingTypeTab />
      {children}
    </div>
  );
}
