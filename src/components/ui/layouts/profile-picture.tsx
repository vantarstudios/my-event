'use client';

import { Fragment } from 'react';
import type { FunctionComponent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from '@/lib/hooks';
import { selectProfile } from '@/lib/store/profile';
import { Button } from '@components/ui/buttons';

const ProfilePicture: FunctionComponent = () => {
    const userProfile = useSelector(selectProfile);
    
    return (
        <Fragment>
            {
                userProfile?.profilePicture
                    ? (
                        <Link href="/dashboard" className="relative w-14 h-14 rounded-full overflow-hidden">
                            <Image
                                src={userProfile.profilePicture || '/dash-profile.svg'}
                                alt="Profile Picture"
                                quality={100}
                                fill
                                className="object-cover object-center"
                            />
                        </Link>
                    ) : (
                        <Link href="/auth/signup">
                            <Button className="hover:bg-primary">Sign up</Button>
                        </Link>
                    )
            }
        </Fragment>
    );
};

export default ProfilePicture;
