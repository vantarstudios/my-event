import { Fragment } from 'react';
import type { FunctionComponent, PropsWithChildren } from 'react';
import { Header, Main } from '@components/dashboard/layout';

const DashboardLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return (
        <Fragment>
            <Header />
            <Main>{children}</Main>
        </Fragment>
    );
};

export default DashboardLayout;
