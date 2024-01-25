import type { FunctionComponent } from 'react';
import Image from 'next/image';
import imageOne from '@public/images/landing-1.png';
import imageTwo from '@public/images/landing-2.png';

interface OverlappingImagesProps {
    className?: string;
}

const OverlappingImages: FunctionComponent<OverlappingImagesProps> = () => {
    return (
        <div className="relative w-full aspect-video lg:w-[45%] lg:aspect-auto">
            <Image
                src={imageTwo}
                alt="hero-section-2"
                priority
                className="lg:ml-[45%] rounded-xl md:rounded-3xl shadow-lg lg:shadow-2xl animate-slide-left"
            />
            <div className="absolute top-0 left-0 scale-50">
                <Image
                    src={imageOne}
                    alt="hero-section-1"
                    className="rounded-2xl md:rounded-4xl shadow-lg lg:shadow-2xl animate-slide-right"
                />
            </div>
        </div>
    );
};

export default OverlappingImages;
