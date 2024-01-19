import type { FunctionComponent } from 'react';
import Image from 'next/image';
import { imagesPlaceholder } from '@/data/images-placeholder';

const ProfilePictureSkeleton: FunctionComponent = () => {
    return (
        <div className="relative w-full h-full">
            <Image
                src="/images/cover.png"
                alt="Profile Picture"
                fill
                placeholder={imagesPlaceholder}
                className="object-cover object-center"
            />
        </div>
    );
};

export default ProfilePictureSkeleton;
