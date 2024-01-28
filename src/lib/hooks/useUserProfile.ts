import { useRequest, useDispatch } from '@/lib/hooks';
import { usersAPI } from '@/lib/api/users';
import { setIsAuthenticated } from '@/lib/store/is-authenticated.state';

export const useUserProfile = () => {
    const dispatch = useDispatch();
    
    const { data, error, isLoading, mutate } = useRequest('user-profile', async () => {
        const response = await usersAPI.getProfile();
        
        if (response.data.success === false) {
            throw new Error(response.data.error.message);
        }
        
        return response.data;
    },
        {
            showError: false,
            revalidateOnMount: true,
            onError: () => {
                dispatch(setIsAuthenticated(false));
            }
        }
    )

    return {
        user: data,
        error,
        isLoading,
        mutate
    };
};
