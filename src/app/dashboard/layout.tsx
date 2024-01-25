import type { FunctionComponent, PropsWithChildren } from 'react';
import { Sidebar } from '@components/dashboard';

const DashboardLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return (
        <main className="flex w-screen h-screen">
            <Sidebar/>
            <section className="flex-1 h-full p-10 child:pr-5 child:overflow-y-auto child:overflow-x-hidden">
                {children}
            </section>
        </main>
    );
};

export default DashboardLayout;
