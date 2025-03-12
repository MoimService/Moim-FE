import axios from 'axios';

import {
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
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
axiosInstance.interceptors.request.use(
  async (config) => {
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    /**
     * TODO:(refresh 토큰 발급 이후)
     * - 토근 재발급 로직
     */

    /**
     * - 401 에러로 실패하면, 로그인 페이지로 리다이렉트하는 로직
     * - 리다이렉트 전에 사용자에게 경고 메시지
     */
    if (error.response?.status === 401) {
      // await removeAccessToken();
      console.log('401 Unauthorized - 토큰 재발급 시도');

      const refreshToken = await getRefreshToken();
      console.log('refreshToken: ', refreshToken);

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
          await axios.post(
            'https://deving.shop/api/v1/auths/refresh',
            {
              refreshToken,
            },
            { withCredentials: true },
          );

          isRefreshing = false;

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
