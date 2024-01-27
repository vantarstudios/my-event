'use client';

import type { FunctionComponent } from 'react';
import { ViewTitle } from '@components/dashboard';
import { ProfilePicture } from '@components/ui/layouts';
import { useUserProfile } from '@/lib/hooks';

const Greetings: FunctionComponent = () => {
    const { user, isLoading, error } = useUserProfile();
    
    return (
        <div className="flex items-center gap-5">
            <ProfilePicture asLink={true} showSignUp={false}/>
            {
                (!isLoading && !error && user?.success)
                    ? (
                        <ViewTitle>Hi, {user.data.firstName}!</ViewTitle>
                    )
                    : <div className="w-40 h-10 skeleton rounded-md"/>
            }
        </div>
    );
};

export default Greetings;
