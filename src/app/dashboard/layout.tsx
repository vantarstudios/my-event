import type { FunctionComponent, PropsWithChildren } from 'react';
import { AuthGuard, Sidebar } from '@components/dashboard';

const DashboardLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return (
        <AuthGuard>
            <main className="flex w-screen h-screen">
                <Sidebar/>
                <section className="flex-1 h-full py-5 pl-10 child:pr-20 child:overflow-y-auto child:overflow-x-hidden">
                    {children}
                </section>
            </main>
        </AuthGuard>
    );
};

export default DashboardLayout;
