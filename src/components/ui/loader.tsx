import type { FunctionComponent } from 'react';
import Image from 'next/image';

const Loader: FunctionComponent = () => {
    return (
        <div className="flex justify-center items-center w-full h-full bg-white">
            <Image
                src="/submark-logo.png"
                alt="Loading"
                width={150}
                height={150}
                priority={true}
                className="animate-ping"
            />
        </div>
    );
};

export default Loader;
