import { Tag, UserStatus } from '@/components/ui/Tag';

interface User {
  id: number;
  status: UserStatus;
}

const userData: User[] = [
  {
    id: 0,
    status: 'APPROVED',
  },
  {
    id: 1,
    status: 'REJECTED',
  },
  {
    id: 2,
    status: 'PENDING',
  },
  {
    id: 3,
    status: 'EXPEL',
  },
];

export default function ButtonExamples() {
  return (
    <div className="m-3 flex flex-col gap-2">
      <div className="flex gap-2">
        {userData.map((user) => (
          <Tag key={user.id} variant={user.status} />
        ))}
      </div>
      <div className="flex gap-2">
        {userData.map((user) => (
          <Tag
            className="h-2 rounded-[20px]"
            key={user.id}
            variant={user.status}
          />
        ))}
      </div>
    </div>
  );
}
