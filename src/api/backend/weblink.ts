import { axiosAuthInstance } from '../axiosInstance';

type Category = 'favorites' | 'work' | 'reference' | 'education';
type getCategory = 'all' | 'favorites' | 'work' | 'reference' | 'education' | 'shared';

export const createWeblink = async (credentials: { name: string; url: string; category: Category }) => {
    await axiosAuthInstance.post('/weblink/', credentials);
};

export const deleteWeblink = async (weblink_id: number) => {
    await axiosAuthInstance.delete('/weblink/delete/', {
        data: { weblink_id },
    });
};

export const updateWeblink = async (credentials: { weblink_id: number; name: string; url: string; category: Category }) => {
    await axiosAuthInstance.patch('/weblink/update/', credentials);
};

export const getWeblink = async (category: getCategory, keyword: string) => {
    const response = await axiosAuthInstance.get('/weblink/search', {
        params: {
            category,
            keyword,
        },
    });

    return response;
};
