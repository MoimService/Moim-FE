import axios from 'axios';

import { getAccessToken, removeAccessToken } from '../serverActions';
import { defaultConfig } from './defaultConfig';

export const authAPI = axios.create(defaultConfig);

authAPI.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken();
    if (accessToken) {
      config.headers.token = `${accessToken}`;
    }
    return config;
  },
  async (error) => {
    /**
     * TODO
     * 에러 발생했다는 팝업, 모달 추가
     */
    return Promise.reject(error);
  },
);

authAPI.interceptors.response.use(
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
      await removeAccessToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);
