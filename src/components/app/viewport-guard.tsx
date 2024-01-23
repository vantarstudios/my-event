'use client';

import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const protectedPaths = ['/auth', '/dashboard'];

const MobileView: FunctionComponent = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <main className="md:hidden flex flex-col justify-between items-center gap-10 w-screen h-screen">
            <div className="relative w-1/2 aspect-square">
                <Image
                    src="/logo.png"
                    alt="Logo"
                    fill
                />
            </div>
            <div className="flex flex-col justify-start items-center gap-5 w-full flex-1">
                <p className="text-7xl font-bold">
                    <span className="text-7xl">O</span>
                    <span className="text-7xl text-primary">oo</span>
                    ps!
                </p>
                <div className="relative w-[110%] aspect-video">
                    <Image
                        src="/images/mobile.svg"
                        alt="Mobile"
                        fill
                        priority
                    />
                </div>
                <p className="text-center font-medium px-5">
                    For better experience, this website can only be accessed on a bigger screen. So, sorry about that!
                </p>
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
                <div className="hidden md:block">
                    {children}
                </div>
            </Fragment>
        );
    }
    
    return children;
};

export default ViewportGuard;
