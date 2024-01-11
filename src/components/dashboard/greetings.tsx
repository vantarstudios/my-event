'use client';

import type { FunctionComponent } from 'react';
import { useSelector } from '@/lib/hooks';
import { selectProfile } from '@/lib/store/states/profile';
import { ViewTitle } from '@components/dashboard';
import { ProfilePicture } from '@components/ui/layouts';

const Greetings: FunctionComponent = () => {
    const profile = useSelector(selectProfile);
    
    return (
        <div className="flex gap-5">
            <ProfilePicture/>
            <ViewTitle>Hi, {profile.firstName}!</ViewTitle>
        </div>
    );
};

export default Greetings;
