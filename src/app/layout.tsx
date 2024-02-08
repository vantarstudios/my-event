import type { FunctionComponent, PropsWithChildren } from 'react';
import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import { Toaster } from 'sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { clientEnv } from '@/lib/utils/env';
import { AuthGuard, ViewportGuard } from '@components/app';
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

const AppLayout: FunctionComponent<PropsWithChildren> = async ({ children }) => {
    return (
        <html lang="en">
            <body className={poppinsFont.className}>
                <ViewportGuard>
                    <GoogleOAuthProvider clientId={clientEnv.GOOGLE_CLIENT_ID}>
                        <AuthGuard>
                            <Toaster expand position="top-right" richColors={true}/>
                            {children}
                        </AuthGuard>
                    </GoogleOAuthProvider>
                </ViewportGuard>
            </body>
        </html>
    );
};

export default AppLayout;
