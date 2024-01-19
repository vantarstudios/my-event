import type { FunctionComponent } from 'react';
import Image from 'next/image';
import { imagesPlaceholder } from '@/data/images-placeholder';

const OverlappingImages: FunctionComponent = () => {
    return (
        <div className="relative w-[45%]">
            <div className="relative ml-[60%] w-full h-full scale-125">
                <Image
                    src="/images/landing-2.png"
                    alt="hero-section"
                    fill
                    className="rounded-3xl shadow-2xl animate-slide-left"
                    placeholder={imagesPlaceholder}
                />
            </div>
            <div className="relative scale-50 h-full -translate-y-full">
                <Image
                    src="/images/landing-1.png"
                    alt="hero-section"
                    fill
                    placeholder={imagesPlaceholder}
                    className="rounded-4xl shadow-2xl animate-slide-right"
                />
            </div>
        </div>
    );
};

export default OverlappingImages;
