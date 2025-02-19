import { axiosAuthInstance } from '../axiosInstance';

type Category = 'favorites' | 'work' | 'reference' | 'education';

export const createWeblink = async (credentials: { name: string; url: string; category: Category }) => {
    await axiosAuthInstance.post('/weblink/', credentials);
};
