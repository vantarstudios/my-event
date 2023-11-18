import type { FunctionComponent, PropsWithChildren, HTMLAttributes, ReactNode } from 'react';
import type { IconProps } from '@/types';
import { cn } from '@/lib/utils';

interface TitledAreaProps extends PropsWithChildren {
    title: string;
    Icon?: FunctionComponent<IconProps>;
    indicator?: ReactNode;
    className?: HTMLAttributes<HTMLDivElement>['className'];
}

const TitledArea: FunctionComponent<TitledAreaProps> = ({ title, Icon, indicator, className, children }) => {
    return (
        <div className={cn('', className)}>
            <div className="flex justify-between items-center mb-2">
                <div className="flex justify-between items-center gap-5 w-fit text-primary">
                    {Icon && <Icon className="w-6 h-6" />}
                    <p className="font-semibold">{title}</p>
                </div>
                {indicator}
            </div>
            {children}
        </div>
    );
};

export default TitledArea;
