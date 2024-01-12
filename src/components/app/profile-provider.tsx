'use client';

import { Fragment, useEffect } from 'react';
import type { FunctionComponent, PropsWithChildren } from 'react';
import { useRequest, useSelector, useDispatch } from '@/lib/hooks';
import { selectProfile, setProfile, clearProfile } from '@/lib/store/states/profile';
import { usersAPI } from '@/lib/api/users';
import { Loader } from '@components/ui';

const ProfileProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const dispatch = useDispatch();
    const profile = useSelector(selectProfile);
    
    const { data: user, error, isLoading } = useRequest('user-profile', async () => {
        if (Object.keys(profile).length > 0) {
            return {
                success: true,
                data: profile,
                timestamp: new Date().toISOString()
            }
        }
        
        const response = await usersAPI.getProfile();
        
        if (response.data.success === false) {
            throw new Error(response.data.error.message);
        }
        
        return response.data;
    }, { showError: false, revalidateOnMount: true });
    
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
            {
                isLoading
                    ? <Loader/>
                    : children
            }
        </Fragment>
    );
};

export default ProfileProvider;
