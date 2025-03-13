import axios from 'axios';

import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
} from '../serverActions';

export const baseURL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 토큰 갱신 중인지 여부를 확인하는 플래그
let isRefreshing = false;
let refreshSubscribers: (() => void)[] = [];

// 모든 대기 중인 요청을 재시도하는 함수
const onAccessTokenFetched = () => {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = []; // 모든 요청이 처리되었기에 배열 초기화
};

// 해당 요청이 서버 사이드인지 클라이언트 사이드인지 판별
const isServer = typeof window === 'undefined';

axiosInstance.interceptors.request.use(
  async (config) => {
    if (isServer) {
      const accessToken = await getAccessToken();
      if (accessToken) {
        config.headers.Cookie = `access_token= ${accessToken}`;
      }
    }

    return config;
  },
  async (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 서버 사이드 환경이면 바로 리턴
    if (isServer) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      console.log('401 Unauthorized - 토큰 재발급 시도');

      const refreshToken = await getRefreshToken();

      if (!refreshToken) {
        console.log('Refresh Token 없음 -> 강제 로그아웃');
        await removeAccessToken();
        await removeRefreshToken();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          // Refresh Token으로 Access Token 재발급 시도
          const res = await axios.post(
            'https://deving.shop/api/v1/auths/refresh',
            {
              refreshToken,
            },
            { withCredentials: true },
          );

          isRefreshing = false;

          // accessToken 서버 쿠키로 다시 저장
          const accessToken = res.data.data.accessToken;
          await setAccessToken(accessToken);

          // 대기중인 요청들을 새로운 access token으로 실행
          onAccessTokenFetched();
          // ✅ 기존 요청 다시 실행 (Access Token 갱신 후)
          return axiosInstance(error.config);
        } catch (refreshError) {
          console.error('Refresh Token 만료 -> 강제 로그아웃');

          // Refresh Token이 만료되었다면 강제 로그아웃 및 로그인 페이지 이동
          await removeAccessToken();
          await removeRefreshToken();
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else {
        // refresh token 요청이 진행 중이라면 대기 (Promise를 반환)
        return new Promise((resolve) => {
          refreshSubscribers.push(() => {
            resolve(axiosInstance(error.config)); // 기존의 요청을 새로운 토큰으로 재시도
          });
        });
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
