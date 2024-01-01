'use client';

import type { FunctionComponent } from 'react';
import Image from 'next/image';
import { useSelector } from '@/lib/hooks';
import { selectProfile } from '@/lib/store/profile';

const ProfilePicture: FunctionComponent = () => {
    const userProfile = useSelector(selectProfile);
    
    return (
        <Image
            src={userProfile.profilePicture || '/dash-profile.svg'}
            alt="Profile Picture"
            width={60}
            height={60}
            quality={100}
            className="aspect-square object-cover rounded-full"
        />
    );
};

export default ProfilePicture;
