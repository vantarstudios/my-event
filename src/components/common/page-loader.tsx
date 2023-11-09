import type { FunctionComponent } from 'react';
import Image from 'next/image';

const PageLoader: FunctionComponent = () => {
    return (
        <div className="flex justify-center items-center w-full h-full bg-white">
            <Image src="/event-media-logo.svg" alt="Loading" width={250} height={250} priority={true} />
        </div>
    );
};

export default PageLoader;
