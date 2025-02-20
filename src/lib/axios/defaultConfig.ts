import { AxiosRequestConfig } from 'axios';

export const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const defaultConfig: AxiosRequestConfig = {
  baseURL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};
