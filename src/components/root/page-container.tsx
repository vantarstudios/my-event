import type { FunctionComponent, PropsWithChildren } from 'react';

const PageContainer: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return (
        <div className="w-full p-[10vh]">
            {children}
        </div>
    );
};

export default PageContainer;
