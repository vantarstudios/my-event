import type { FunctionComponent, PropsWithChildren, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends PropsWithChildren {
    className?: HTMLAttributes<HTMLDivElement>['className'];
    onClick?: HTMLAttributes<HTMLDivElement>['onClick'];
}

const Card: FunctionComponent<CardProps> = ({ children, className, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={cn(
                'h-fit px-8 py-4 rounded-3xl border border-stone-900 border-opacity-5 bg-white shadow-md transition-all hover:shadow-sm',
                className,
            )}
        >
            {children}
        </div>
    );
};

export default Card;
