import type { FunctionComponent } from 'react';
import Image from 'next/image';

const ComingSoon: FunctionComponent = () => {
    return (
        <div className="flex flex-col justify-between items-center gap-10 w-full">
            <p className="text-xl md:text-3xl text-center font-medium">Still working on it, please come back later!</p>
            <div className="relative w-screen lg:w-3/5 aspect-video">
                <Image
                    src="/images/coming-soon.svg"
                    alt="Coming soon"
                    fill
                    priority
                />
            </div>
        </div>
    );
};

export default ComingSoon;
