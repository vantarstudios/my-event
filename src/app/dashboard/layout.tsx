import type { FunctionComponent, PropsWithChildren } from 'react';
import { UserProvider } from '@/contexts/user-context';
import { Header, Main } from '@components/dashboard/layout';

const DashboardLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return (
        <UserProvider>
            <Header />
            <Main>{children}</Main>
        </UserProvider>
    );
};

export default DashboardLayout;
