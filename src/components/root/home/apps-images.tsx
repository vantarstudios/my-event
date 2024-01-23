'use client';

import { useRef, FunctionComponent } from 'react';
import Image from 'next/image';
import { useAnimateOnScroll } from '@/lib/hooks';
import googleImage from '@public/images/landing-google.png';
import slackImage from '@public/images/landing-slack.png';
import figmaImage from '@public/images/landing-figma.png';

const AppsImages: FunctionComponent = () => {
    const ref = useRef<HTMLDivElement>(null);
    useAnimateOnScroll<HTMLDivElement>(ref, 'animate-float');
    
    return (
        <div
            ref={ref}
            className="relative hidden md:flex justify-center w-[50%] lg:w-[45%] h-full"
        >
            <div className="relative w-[30vh] aspect-square">
                <Image
                    src={googleImage}
                    alt="Google"
                    className="transform -rotate-12"
                />
            </div>
            <div className="absolute top-1/4 left-1/2">
                <div className="relative w-[38vh] aspect-square">
                    <Image
                        src={slackImage}
                        alt="Slack"
                        className="transform rotate-12"
                    />
                </div>
            </div>
            <div className="absolute top-3/4 left-1/4">
                <div className="relative w-[35vh] aspect-square">
                    <Image
                        src={figmaImage}
                        alt="Figma"
                        className=""
                    />
                </div>
            </div>
        </div>
    );
};

export default AppsImages;
