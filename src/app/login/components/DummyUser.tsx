'use client';

import { Button } from '@/components/ui/Button';
import { useLoginMutation } from '@/hooks/mutations/useUserMutation';
import { useRouter } from 'next/navigation';

const DummyUser = () => {
  const router = useRouter();
  const password = 'test1234';

  const { mutate } = useLoginMutation({
    onSuccessCallback: () => router.push('/'),
  });

  return (
    <div>
      <Button
        onClick={() =>
          mutate({
            email: 'yunji@naver.com',
            password,
          })
        }
      >
        강윤지
      </Button>
      <Button
        onClick={() =>
          mutate({
            email: 'a1056719@gmail.com',
            password,
          })
        }
      >
        이윤재
      </Button>
      <Button
        onClick={() =>
          mutate({
            email: 'ehdtjr119@naver.com',
            password,
          })
        }
      >
        이동석
      </Button>
      <Button
        onClick={() =>
          mutate({
            email: 'dlgkssk0209@gmail.com',
            password,
          })
        }
      >
        이한나
      </Button>
    </div>
  );
};

export default DummyUser;
