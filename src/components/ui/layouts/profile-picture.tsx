'use client';

import { Fragment } from 'react';
import type { FunctionComponent } from 'react';
import Link from 'next/link';
import { useUserProfile } from '@/lib/hooks';
import type { User } from '@/types';
import { imagesPlaceholder } from '@/data/images-placeholder';
import { ImageWithFallback } from '@components/ui';
import { PrimaryButton } from '@components/ui/buttons';
import { ProfilePictureSkeleton } from '@components/ui/skeletons';

interface ProfilePictureProps {
    showSignUp?: boolean;
    asLink?: boolean;
}

interface PictureProps {
    profilePicture: User['profilePicture'];
    isLoading: boolean;
    error: Error;
}

const Picture: FunctionComponent<PictureProps> = ({ profilePicture, isLoading, error }) => {
    return (
        <Fragment>
            {
                (!isLoading && !error && profilePicture)
                    ? (
                        <ImageWithFallback
                            src={profilePicture.url}
                            alt="Profile Picture"
                            quality={100}
                            placeholder={imagesPlaceholder}
                            fill
                            sizes="100%, 100%"
                            className="object-center object-cover"
                            fallbackClassName="scale-[1.75]"
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
    const { user, error, isLoading } = useUserProfile();
    
    return (
        <Fragment>
            {
                (user && !error)
                    ?  asLink
                        ? (
                            <Link href="/dashboard" className="relative w-14 h-14 rounded-full overflow-hidden">
                                <Picture profilePicture={user.profilePicture} isLoading={isLoading} error={error}/>
                            </Link>
                        )
                        : <Picture profilePicture={user.profilePicture} isLoading={isLoading} error={error}/>
                    : showSignUp && (
                        <Link href="/auth/signup">
                            <PrimaryButton className="min-w-max">Sign up</PrimaryButton>
                        </Link>
                    )
            }
        </Fragment>
    );
};

export default ProfilePicture;
