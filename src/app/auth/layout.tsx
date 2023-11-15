'use client';

import type { FunctionComponent, PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@components/ui';
import { ArrowLeft } from '@components/ui/icons';

const AuthLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const router = useRouter();

    return (
        <main className={'relative flex justify-center items-top w-screen h-screen py-20 overflow-y-auto'}>
            <Button
                className="absolute top-10 left-10 flex items-center gap-2 text-xl text-black bg-inherit"
                onClick={() => router.back()}
            >
                <ArrowLeft className="w-6 h-6" />
                Back
            </Button>
            <div className="flex flex-col justify-start items-center gap-12 w-[max(450px,25%)]">{children}</div>
        </main>
    );
};

export default AuthLayout;
