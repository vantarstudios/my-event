import type { FunctionComponent } from 'react';
import Image from 'next/image';

const PageLoader: FunctionComponent = () => {
    return (
        <div className="flex justify-center items-center w-full h-full bg-white">
            <Image
                src="/event-media-logo.svg"
                alt="Loading"
                width={100}
                height={100}
                priority={true}
                className="animate-ping"
            />
        </div>
    );
};

export default PageLoader;
