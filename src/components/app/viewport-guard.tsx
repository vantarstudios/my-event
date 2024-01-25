'use client';

import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@components/ui/buttons';
import logo from '@public/logo.png';

const protectedPaths = ['/auth', '/dashboard'];

const MobileView: FunctionComponent = () => {
    const router = useRouter();
    const currentYear = new Date().getFullYear();
    
    return (
        <main className="md:hidden flex flex-col justify-between items-center w-screen h-screen">
            <div className="relative w-1/3 sm:w-1/4 aspect-square">
                <Image
                    src={logo}
                    alt="Logo"
                />
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center w-full flex-1">
                <p className="text-6xl font-bold">
                    <span className="text-6xl">O</span>
                    <span className="text-6xl text-primary">oo</span>
                    ps!
                </p>
                <div className="relative w-[110%] sm:w-3/4 aspect-video">
                    <Image
                        src="/images/mobile.svg"
                        alt="Mobile"
                        fill
                        priority
                    />
                </div>
                <p className="text-center font-medium px-5">
                    For better experience, this website can only be accessed on a <span className="font-bold">Laptop</span>. So, sorry about that!
                </p>
                <Button
                    onClick={() => router.back()}
                    className="px-10 py-4 md:px-16 mt-5 rounded-full lg:text-lg font-normal hover:bg-primary"
                >
                    Back to Home page
                </Button>
            </div>
            <p className="w-full mt-auto mb-5 text-sm text-center">
                Vantar Studios &copy; Copyright {currentYear}
            </p>
        </main>
    );
};

const ViewportGuard: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const pathname = usePathname();
    
    if (protectedPaths.some(path => pathname.startsWith(path))) {
        return (
            <Fragment>
                <MobileView/>
                <div className="hidden md:block w-full h-full">
                    {children}
                </div>
            </Fragment>
        );
    }
    
    return children;
};

export default ViewportGuard;
