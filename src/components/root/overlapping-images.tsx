import type { FunctionComponent } from 'react';
import Image from 'next/image';
import landingImageOne from '@public/images/landing-1.png';
import landingImageTwo from '@public/images/landing-2.png';

const OverlappingImages: FunctionComponent = () => {
    return (
        <div className="relative w-[45%]">
            <Image
                src={landingImageTwo}
                alt="hero-section"
                className="ml-[40%] rounded-3xl shadow-2xl animate-slide-left"
            />
            <div className="absolute left-[15%] top-1/2 -translate-y-1/2 w-1/2">
                <Image
                    src={landingImageOne}
                    alt="hero-section"
                    className="rounded-3xl shadow-2xl animate-slide-right"
                />
            </div>
        </div>
    );
};

export default OverlappingImages;
