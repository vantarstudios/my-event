'use client';

import { Fragment } from 'react';
import type { FunctionComponent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from '@/lib/hooks';
import { selectProfile } from '@/lib/store/states/profile';
import { Button } from '@components/ui/buttons';
import { ProfilePictureSkeleton } from '@components/ui/skeletons';

interface ProfilePictureProps {
    showSignUp?: boolean;
    asLink?: boolean;
}

const Picture: FunctionComponent<{ userProfile: ReturnType<typeof selectProfile> }> = ({ userProfile }) => {
    return (
        <Fragment>
            {
                userProfile.profilePicture
                    ? (
                        <Image
                            src={userProfile.profilePicture}
                            alt="Profile Picture"
                            quality={100}
                            fill
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcs3h9PQAGQAJvh+e7cgAAAABJRU5ErkJggg=="
                            className="object-cover object-center"
                        />
                    )
                    : (
                        <ProfilePictureSkeleton/>
                    )
            }
        </Fragment>
    );
};

const ProfilePicture: FunctionComponent<ProfilePictureProps> = ({ showSignUp = false, asLink = true }) => {
    const userProfile = useSelector(selectProfile);
    
    return (
        <Fragment>
            {
                userProfile?.profilePicture
                    ?  asLink
                        ? (
                            <Link href="/dashboard" className="relative w-14 h-14 rounded-full overflow-hidden">
                                <Picture userProfile={userProfile}/>
                            </Link>
                        )
                        : <Picture userProfile={userProfile}/>
                    : showSignUp && (
                        <Link href="/auth/signup">
                            <Button className="hover:bg-primary">Sign up</Button>
                        </Link>
                    )
            }
        </Fragment>
    );
};

export default ProfilePicture;
