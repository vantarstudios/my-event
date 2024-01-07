'use client';

import { Fragment } from 'react';
import type { FunctionComponent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from '@/lib/hooks';
import { selectProfile } from '@/lib/store/profile';
import { Button } from '@components/ui';

const ProfilePicture: FunctionComponent = () => {
    const userProfile = useSelector(selectProfile);
    
    return (
        <Fragment>
            {
                userProfile?.profilePicture
                    ? (
                        <Link href="/dashboard">
                            <Image
                                src={userProfile.profilePicture || '/dash-profile.svg'}
                                alt="Profile Picture"
                                width={60}
                                height={60}
                                quality={100}
                                className="aspect-square object-cover rounded-full"
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
