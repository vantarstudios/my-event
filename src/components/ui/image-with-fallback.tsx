'use client';

import { useState, type FunctionComponent } from 'react';
import Image, { type ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface ImageWithFallbackProps extends ImageProps {
    fallbackClassName?: ImageProps['className'];
}

const FALLBACK_SRC: ImageProps['src'] = '/images/placeholder.png';

const ImageWithFallback: FunctionComponent<ImageWithFallbackProps> = (props) => {
    const [src, setSrc] = useState(props.src);
    const [className, setClassName] = useState(props.className);
    
    return (
        <Image
            {...props}
            src={src}
            className={className}
            onError={() => {
                setSrc(FALLBACK_SRC);
                setClassName(cn(className, props.fallbackClassName));
            }}
        />
    );
};

export default ImageWithFallback;
