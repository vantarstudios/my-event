import type { FunctionComponent } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface OverlappingImagesProps {
    className?: string;
}

const OverlappingImages: FunctionComponent<OverlappingImagesProps> = ({ className }) => {
    return (
        <div className={cn('relative w-full aspect-video lg:w-[45%] lg:aspect-auto', className)}>
            <div className="relative lg:ml-[60%] w-full h-full scale-90 lg:scale-125">
                <Image
                    src="/images/landing-2.png"
                    alt="hero-section"
                    fill
                    className="rounded-xl md:rounded-3xl shadow-lg lg:shadow-2xl animate-slide-left"
                />
            </div>
            <div className="relative scale-50 h-full -translate-y-full">
                <Image
                    src="/images/landing-1.png"
                    alt="hero-section"
                    fill
                    className="rounded-2xl md:rounded-4xl shadow-lg lg:shadow-2xl animate-slide-right"
                />
            </div>
        </div>
    );
};

export default OverlappingImages;
