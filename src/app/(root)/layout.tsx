import { Fragment } from 'react';
import type { FunctionComponent, PropsWithChildren } from 'react';
import { Header, Footer } from '@components/ui';

const RootLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return (
        <Fragment>
            <Header/>
            <main className="w-screen min-h-screen mt-[15vh]">
                {children}
            </main>
            <Footer/>
        </Fragment>
    )
};

export default RootLayout;
