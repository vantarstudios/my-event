import { useRequest } from '@/lib/hooks';
import { usersAPI } from '@/lib/api/users';

export const useUserProfile = () => {
    const { data, error, isLoading, mutate } = useRequest('user-profile', async () => {
        const response = await usersAPI.getProfile();
        return response.data;
    });

    return {
        user: data,
        error,
        isLoading,
        mutate
    };
};
