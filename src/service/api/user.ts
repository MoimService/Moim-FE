import { basicAPI } from '@/lib/axios/basicApi';

const postLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await basicAPI.post('/api/v1/auths/login', { email, password });

  return res;
};
export { postLogin };
