import type { FunctionComponent, PropsWithChildren, HTMLAttributes } from 'react';
import type { IconProps } from '@/types';
import { cn } from '@/lib/utils';

interface TitledAreaProps extends PropsWithChildren {
    title: string;
    Icon?: FunctionComponent<IconProps>;
    className?: HTMLAttributes<HTMLDivElement>['className'];
}

const TitledArea: FunctionComponent<TitledAreaProps> = ({ title, Icon, className, children }) => {
    return (
        <div className={cn('', className)}>
            <div className="flex justify-between items-center gap-5 mb-4 w-fit text-primary">
                {Icon && <Icon className="w-6 h-6" />}
                <p className="font-semibold">{title}</p>
            </div>
            {children}
        </div>
    );
};

export default TitledArea;
