import type { FunctionComponent, PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Toaster } from 'sonner';
import { StoreProvider } from '@components/root';
import './globals.css';

const poppinsFont = Poppins({
    weight: ['100', '200', '300', '400', '500', '600', '700'],
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
                    <Toaster expand position="top-right" richColors={true}/>
                    {children}
                </StoreProvider>
            </body>
        </html>
    );
};

export default AppLayout;
