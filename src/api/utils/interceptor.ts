import axios from 'axios';
import { refreshToken } from '../refreshToken';
import { removeTokens } from './storage';

axios.interceptors.response.use(
    (response) => {
        return response;
    },

    async (error) => {
        const originalRequest = error.config;
        const flag = error.response.status === 403 && error.response.data.message === '액세스 토큰이 만료되었습니다.';

        if (flag && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newAccessToken = await refreshToken();
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                return axios(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh failed', refreshError);
                window.location.href = '/';
                removeTokens();
            }
        }
        return Promise.reject(error);
    },
);
