'use client';

import { Fragment } from 'react';
import type { FunctionComponent } from 'react';
import Link from 'next/link';
import { useSelector } from '@/lib/hooks';
import { selectProfile } from '@/lib/store/states/profile';
import { imagesPlaceholder } from '@/data/images-placeholder';
import { ImageWithFallback } from '@components/ui';
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
                        <ImageWithFallback
                            src={userProfile.profilePicture}
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
                            <Button className="min-w-max hover:bg-primary">Sign up</Button>
                        </Link>
                    )
            }
        </Fragment>
    );
};

export default ProfilePicture;
