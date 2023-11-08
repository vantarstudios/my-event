import type { FunctionComponent, PropsWithChildren, ReactNode } from 'react';

interface ViewTitleProps extends PropsWithChildren {
    icon?: ReactNode;
}

const ViewTitle: FunctionComponent<ViewTitleProps> = ({ icon, children }) => {
    return (
        <p className="text-2xl font-bold">
            {icon}
            {children}
        </p>
    );
};

export default ViewTitle;
