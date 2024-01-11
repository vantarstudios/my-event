'use client';

import { Fragment, useEffect } from 'react';
import type { FunctionComponent, PropsWithChildren } from 'react';
import { useRequest, useDispatch } from '@/lib/hooks';
import { setProfile, clearProfile } from '@/lib/store/states/profile';
import { usersAPI } from '@/lib/api/users';

const ProfileProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const dispatch = useDispatch();
    
    const { data: user, error, isLoading } = useRequest('user-profile', async () => {
        const response = await usersAPI.getProfile();
        
        if (response.data.success === false) {
            throw new Error(response.data.error.message);
        }
        
        return response.data;
    }, { showError: false });
    
    useEffect(() => {
        if (!isLoading) {
            if (!error && user?.success) {
                dispatch(setProfile(user.data));
            } else {
                dispatch(clearProfile());
            }
        }
    }, [dispatch, isLoading, error, user]);
    
    return (
        <Fragment>
            {!isLoading && children}
        </Fragment>
    );
};

export default ProfileProvider;
