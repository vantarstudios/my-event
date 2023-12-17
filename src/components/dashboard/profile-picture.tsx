'use client';

import { useContext } from 'react';
import type { FunctionComponent } from 'react';
import Image from 'next/image';
import { UserContext } from '@/contexts/user-context';

const ProfilePicture: FunctionComponent = () => {
    const { userProfile } = useContext(UserContext);
    
    return (
        <Image
            src={userProfile.profilePicture || '/dash-profile.svg'}
            alt="Profile Picture"
            width={60}
            height={60}
            className="aspect-square object-cover rounded-full"
        />
    );
};

export default ProfilePicture;
