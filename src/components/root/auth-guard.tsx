'use client';

import { useEffect } from 'react';
import type { FunctionComponent, PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';
import { useRequest, useDispatch } from '@/lib/hooks';
import { setProfile } from '@/lib/store/profile';
import { usersAPI } from '@/lib/api/users';

const AuthGuard: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    
    const { data: user, error, isLoading } = useRequest('user-profile', async () => {
        const response = await usersAPI.getProfile();
        
        if (response.data.success === false) {
            throw new Error(response.data.error.message);
        }
        
        return response.data;
    });
    
    useEffect(() => {
        if (!isLoading) {
            if (error?.response.status === 401) {
                router.push('/auth/signin');
            }
            
            if (user?.success) {
                dispatch(setProfile(user.data));
            }
        }
    }, [isLoading, error, user]);
    
    return (
        <>
            {!isLoading && children}
        </>
    );
};

export default AuthGuard;
