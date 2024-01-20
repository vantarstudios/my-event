import type { FunctionComponent, PropsWithChildren } from 'react';

const PageContainer: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return (
        <div className="w-full min-h-[86vh] p-5 md:p-20">
            {children}
        </div>
    );
};

export default PageContainer;
