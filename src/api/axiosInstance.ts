import axios, { InternalAxiosRequestConfig } from 'axios';
import { getAccessToken } from './utils/storage';

const axiosBaseInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    timeout: 10000,
});

const axiosAuthInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    timeout: 10000,
});

export const setAuthHeader = (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
};

axiosAuthInstance.interceptors.request.use(setAuthHeader, (error) => Promise.reject(error));

export { axiosBaseInstance, axiosAuthInstance };
