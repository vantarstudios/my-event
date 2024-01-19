'use client';

import { useRef, FunctionComponent } from 'react';
import Image from 'next/image';
import { useAnimateOnScroll } from '@/lib/hooks';
import { imagesPlaceholder } from '@/data/images-placeholder';

const AppsImages: FunctionComponent = () => {
    const ref = useRef<HTMLDivElement>(null);
    useAnimateOnScroll<HTMLDivElement>(ref, 'animate-float');
    
    return (
        <div
            ref={ref}
            className="relative flex justify-center w-[45%] h-full"
        >
            <div className="relative w-[30vh] aspect-square">
                <Image
                    src="/images/landing-google.png"
                    alt="Google"
                    fill
                    placeholder={imagesPlaceholder}
                    className="transform -rotate-12"
                />
            </div>
            <div className="absolute top-1/4 left-1/2">
                <div className="relative w-[38vh] aspect-square">
                    <Image
                        src="/images/landing-slack.png"
                        alt="Slack"
                        fill
                        placeholder={imagesPlaceholder}
                        className="transform rotate-12"
                    />
                </div>
            </div>
            <div className="absolute top-3/4 left-1/4">
                <div className="relative w-[35vh] aspect-square">
                    <Image
                        src="/images/landing-figma.png"
                        alt="Figma"
                        fill
                        placeholder={imagesPlaceholder}
                        className=""
                    />
                </div>
            </div>
        </div>
    );
};

export default AppsImages;
