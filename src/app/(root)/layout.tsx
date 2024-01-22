import { Fragment } from 'react';
import type { FunctionComponent, PropsWithChildren } from 'react';
import { Header, Footer } from '@components/ui/layouts';

const RootLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return (
        <Fragment>
            <Header/>
            <main className="w-screen min-h-[86vh] md:min-h-[85vh] mt-24 md:mt-[15vh] overflow-hidden">
                {children}
            </main>
            <Footer/>
        </Fragment>
    )
};

export default RootLayout;
