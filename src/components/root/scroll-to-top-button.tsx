'use client';

import type { FunctionComponent } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@components/ui/buttons';
import { ChevronLeft } from '@components/ui/icons';

interface ScrollToTopButtonProps {
    className?: string;
}

const ScrollToTopButton: FunctionComponent<ScrollToTopButtonProps> = ({ className }) => {
    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    return (
        <Button
            onClick={handleClick}
            className={cn(
                'flex justify-center items-center w-12 h-12 p-2 rounded-full text-black bg-white',
                className
            )}
        >
            <ChevronLeft strokeWidth="regular" className="w-5 h-5 rotate-90"/>
        </Button>
    )
};

export default ScrollToTopButton;
