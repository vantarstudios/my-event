'use client';

import { createContext, useState, useEffect } from 'react';
import type { FunctionComponent, PropsWithChildren, Dispatch, SetStateAction } from 'react';
import { useRequest } from '@/lib/hooks/useRequest';
import { usersAPI } from '@/lib/api/users';
import type { UserProfile } from '@/types/users';

export const UserContext = createContext<{
    userProfile: UserProfile;
    setUserProfile: Dispatch<SetStateAction<UserProfile>>;
}>({
    userProfile: {} as UserProfile,
    setUserProfile: () => {},
});

export const UserProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const [userProfile, setUserProfile] = useState<UserProfile>({} as UserProfile);
    const { data: user, error, isLoading } = useRequest('user-profile', async () => {
        const response = await usersAPI.getProfile();
        
        if (response.data.success === false) {
            throw new Error(response.data.error.message);
        }
        
        return response.data;
    });
    
    useEffect(() => {
        if (!isLoading && !error && user?.success) {
            setUserProfile(user.data);
        }
    }, [isLoading, error, user]);
    
    return (
        <UserContext.Provider value={{
            userProfile,
            setUserProfile,
        }}>
            {
                !isLoading && children
            }
        </UserContext.Provider>
    );
};
