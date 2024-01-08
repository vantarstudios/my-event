'use client';

import { useRef, FunctionComponent } from 'react';
import Image from 'next/image';
import { useAnimateOnScroll } from '@/lib/hooks';
import googleImage from '@public/images/landing-google.png';
import figmaImage from '@public/images/landing-figma.png';
import slackImage from '@public/images/landing-slack.png';

const AppsImages: FunctionComponent = () => {
    const ref = useRef<HTMLDivElement>(null);
    useAnimateOnScroll<HTMLDivElement>(ref, 'animate-float');
    
    return (
        <div
            ref={ref}
            className="relative flex justify-center w-[45%] h-full"
        >
            <Image
                src={googleImage}
                alt="Google"
                className="w-[30vh] aspect-square transform -rotate-12"
            />
            <Image
                src={slackImage}
                alt="Google"
                className="w-[38vh] aspect-square transform rotate-12 absolute top-1/4 left-1/2"
            />
            <Image
                src={figmaImage}
                alt="Google"
                className="w-[35vh] aspect-square absolute top-3/4 left-1/4"
            />
        </div>
    );
};

export default AppsImages;
