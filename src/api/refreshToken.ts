import { axiosAuthInstance } from './axiosInstance';
import { getRefreshToken, setTokens } from './utils/storage';

export const refreshToken = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new Error('No refresh token available');

    const response = await axiosAuthInstance.post('/auth/refresh', { refreshToken });
    const { accessToken, refreshToken: newRefreshToken } = response.data;

    setTokens(accessToken, newRefreshToken);
    return accessToken;
};
