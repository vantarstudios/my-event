'use client';

import type { FunctionComponent } from 'react';
import { useSelector } from '@/lib/hooks';
import { selectProfile } from '@/lib/store/profile';
import { ViewTitle } from '@components/dashboard';

const Greetings: FunctionComponent = () => {
    const profile = useSelector(selectProfile);
    
    return (
        <ViewTitle>Hi, {profile.firstName}!</ViewTitle>
    );
};

export default Greetings;
