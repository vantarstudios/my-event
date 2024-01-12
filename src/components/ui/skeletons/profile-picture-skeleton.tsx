import type { FunctionComponent } from 'react';
import { Person } from '@components/ui/icons';

const ProfilePictureSkeleton: FunctionComponent = () => {
    return (
        <div className="flex justify-center items-center w-full h-full bg-gray-400">
            <Person className="w-[50%] h-[50%] text-white" />
        </div>
    );
};

export default ProfilePictureSkeleton;
