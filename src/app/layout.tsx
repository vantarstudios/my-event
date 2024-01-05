import './globals.css';
import type { FunctionComponent, PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Toaster } from 'sonner';
import { AuthGuard, StoreProvider } from '@components/root';

const poppinsFont = Poppins({
    weight: ['200', '300', '400', '500'],
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'My Event',
    description: 'Event management platform',
};

const AppLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return (
        <html lang="en">
            <body className={poppinsFont.className}>
                <StoreProvider>
                    <AuthGuard>
                        <Toaster expand position="top-right" richColors={true}/>
                        {children}
                    </AuthGuard>
                </StoreProvider>
            </body>
        </html>
    );
};

export default AppLayout;
