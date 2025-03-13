import axiosInstance from '@/lib/axios/axiosInstance';
import { ISignupFormData } from 'types/auth';

const postLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await axiosInstance.post('/api/v1/auths/login', {
    email,
    password,
  });

  return res.data.data;
};

const getNameCheck = async (name: string) => {
  const res = await axiosInstance.get(`/api/v1/auths/signup/name?name=${name}`);
  return res;
};

const getEmailCheck = async (email: string) => {
  const res = await axiosInstance.get(
    `/api/v1/auths/signup/email?email=${email}`,
  );
  return res;
};

const postSignup = async (data: ISignupFormData) => {
  const res = await axiosInstance.post('/api/v1/auths/signup', data);
  return res;
};

const deleteLogout = async () => {
  const res = await axiosInstance.delete('/api/v1/auths/logout');
  return res;
};

export { postLogin, getNameCheck, getEmailCheck, postSignup, deleteLogout };
