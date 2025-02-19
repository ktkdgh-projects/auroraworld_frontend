import { axiosAuthInstance } from '../axiosInstance';

type Category = 'favorites' | 'work' | 'reference' | 'education';

export const createWeblink = async (credentials: { name: string; url: string; category: Category }) => {
    await axiosAuthInstance.post('/weblink/', credentials);
};

export const deleteWeblink = async (weblink_id: number) => {
    await axiosAuthInstance.delete('/weblink/delete/', {
        data: { weblink_id },
    });
};
