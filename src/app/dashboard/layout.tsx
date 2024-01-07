import type { FunctionComponent, PropsWithChildren } from 'react';
import { Sidebar } from '@components/dashboard';

const DashboardLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return (
        <main className="flex w-screen h-screen">
            <Sidebar/>
            <section className="flex-1 h-full py-5 pl-10 child:pr-20 child:overflow-y-auto child:overflow-x-hidden">
                {children}
            </section>
        </main>
    );
};

export default DashboardLayout;
