import './globals.css';
import type { FunctionComponent, PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Toaster } from 'sonner';
import StoreContext from '@/components/root/store-context';
import AuthGuard from '@/components/root/auth-guard';

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
                <StoreContext>
                    <AuthGuard>
                        <Toaster expand position="top-right" richColors={true}/>
                        {children}
                    </AuthGuard>
                </StoreContext>
            </body>
        </html>
    );
};

export default AppLayout;
