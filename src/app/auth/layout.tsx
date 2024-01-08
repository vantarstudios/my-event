'use client';

import type { FunctionComponent, PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@components/ui/buttons';
import { ArrowLeft } from '@components/ui/icons';

const AuthLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const router = useRouter();

    return (
        <main className={'relative flex justify-center items-top w-screen h-screen py-10 overflow-y-auto'}>
            <Button
                className="absolute top-5 left-10 flex items-center gap-2 text-xl text-black bg-inherit"
                onClick={() => router.back()}
            >
                <ArrowLeft className="w-6 h-6" />
                Back
            </Button>
            {children}
        </main>
    );
};

export default AuthLayout;
