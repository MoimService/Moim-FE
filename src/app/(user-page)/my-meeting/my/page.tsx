import NotYet from '@/components/common/NotYet';

import Created from '../_features/Created';
// import Joined from '../../components/Joined';
import Tab from '../_features/Tab';

export default function Page({
  searchParams,
}: {
  searchParams: { type: string };
}) {
  const type = searchParams?.type;

  return (
    <div>
      <div className="mt-6 flex flex-col gap-[24px]">
        <Tab type={type} />
      </div>
      {type === 'created' ? <Created /> : <NotYet />}
    </div>
  );
}
