import type { FunctionComponent, PropsWithChildren } from 'react';
import { Header, Main } from '@components/dashboard/layout';

const DashboardLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <Header />
            <Main>{children}</Main>
        </>
    );
};

export default DashboardLayout;
