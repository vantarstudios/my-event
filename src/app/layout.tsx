import type { FunctionComponent, PropsWithChildren } from 'react';
import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { Toaster } from 'sonner';
import { AuthProvider, AuthGuard, ViewportGuard } from '@components/app';
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
    const session = await getServerSession();
    
    return (
        <html lang="en">
            <body className={poppinsFont.className}>
                <ViewportGuard>
                    <AuthProvider session={session}>
                        <AuthGuard>
                            <Toaster expand position="top-right" richColors={true}/>
                            {children}
                        </AuthGuard>
                    </AuthProvider>
                </ViewportGuard>
            </body>
        </html>
    );
};

export default AppLayout;
