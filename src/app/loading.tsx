import type { FunctionComponent } from 'react';
import Image from 'next/image';

const Loading: FunctionComponent = () => {
    return (
        <div className="flex justify-center items-center w-screen h-screen bg-white">
            <div className="h-[50vh] aspect-square">
                <Image src="/event-media-logo.svg" alt="Loading" fill={true} priority={true} />
            </div>
        </div>
    );
};

export default Loading;
