import type { FunctionComponent, PropsWithChildren } from 'react';
import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import { Toaster } from 'sonner';
import { StoreProvider, AuthGuard, ViewportGuard } from '@components/app';
import './global.css';

const poppinsFont = Poppins({
    weight: ['100', '200', '300', '400', '500', '600', '700'],
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'MyEvent',
    description: 'The most powerful management tool for your events.',
};

export const viewport: Viewport = {
    colorScheme: 'only light',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true
};

const AppLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return (
        <html lang="en">
            <body className={poppinsFont.className}>
                <ViewportGuard>
                    <StoreProvider>
                        <AuthGuard>
                            <Toaster expand position="top-right" richColors={true}/>
                            {children}
                        </AuthGuard>
                    </StoreProvider>
                </ViewportGuard>
            </body>
        </html>
    );
};

export default AppLayout;
