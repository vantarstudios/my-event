import type { FunctionComponent, PropsWithChildren } from 'react';
import type { IconProps } from '@/types';

interface ViewTitleProps extends PropsWithChildren {
    Icon?: FunctionComponent<IconProps>;
}

const ViewTitle: FunctionComponent<ViewTitleProps> = ({ Icon, children }) => {
    return (
        <p className="flex items-center gap-4 text-xl text-black font-bold">
            {Icon && <Icon className="w-6 h-6" />}
            {children}
        </p>
    );
};

export default ViewTitle;
