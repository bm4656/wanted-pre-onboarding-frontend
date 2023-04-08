import axios, { InternalAxiosRequestConfig } from 'axios';

//api 요청 인스턴스
const api = axios.create({
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem('accessToken');

    //모든 요청 시 accessToken 인가 받기
    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  error => {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);

export default api;
