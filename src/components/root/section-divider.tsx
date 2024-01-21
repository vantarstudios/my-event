import type { FunctionComponent } from 'react';
import { cn } from '@/lib/utils';

interface SectionDividerProps {
    className?: string;
}

const SectionDivider: FunctionComponent<SectionDividerProps> = ({ className }) => {
    return (
        <div className={cn('w-32 lg:w-40 h-2 lg:h-3 mx-auto my-10 lg:my-16 bg-black rounded-full', className)} />
    );
};

export default SectionDivider;
