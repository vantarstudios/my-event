import { useRequest } from '@/lib/hooks';
import { usersAPI } from '@/lib/api/users';

export const useUserProfile = () => {
    const { data, error, isLoading, mutate } = useRequest('user-profile', async () => {
        const response = await usersAPI.getProfile();
        
        if (response.data.success === false) {
            throw new Error(response.data.error.message);
        }
        
        return response.data;
    });

    return {
        user: data,
        error,
        isLoading,
        mutate
    };
};
