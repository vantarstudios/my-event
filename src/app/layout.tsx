import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ weight: ['200', '300', '400', '500'], subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'My event',
    description: 'Event management platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={poppins.className}>{children}</body>
        </html>
    );
}
