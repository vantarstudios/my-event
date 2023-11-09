import type { FunctionComponent, PropsWithChildren, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface TitledAreaProps extends PropsWithChildren {
    title: string;
    className?: HTMLAttributes<HTMLDivElement>['className'];
}

const TitledArea: FunctionComponent<TitledAreaProps> = ({ title, className, children }) => {
    return (
        <div className={cn('', className)}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-primary">{title}</h2>
            </div>
            {children}
        </div>
    );
};

export default TitledArea;
