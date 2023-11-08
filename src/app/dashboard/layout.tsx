import { Fragment } from 'react';
import type { FunctionComponent, PropsWithChildren } from 'react';
import { Header } from '@components/dashboard';

const DashboardLayout: FunctionComponent<PropsWithChildren<{}>> = ({ children }) => {
    return (
        <Fragment>
            <Header/>
            <main>
                {children}
            </main>
        </Fragment>
    );
};

export default DashboardLayout;
