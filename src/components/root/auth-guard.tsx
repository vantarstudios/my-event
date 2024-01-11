'use client';

import { Fragment, useEffect } from 'react';
import type { FunctionComponent, PropsWithChildren } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from '@/lib/hooks';
import { selectProfile } from '@/lib/store/states/profile';

const routesToProtect = [
    '/dashboard',
];

const AuthGuard: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const profile = useSelector(selectProfile);

    useEffect(() => {
        if (
            Object.keys(profile).length === 0
            && routesToProtect.some((route) => pathname.startsWith(route))
        ) {
            router.push('/auth/signin');
        }
        
    }, [router, pathname, profile]);
    
    return (
        <Fragment>
            {children}
        </Fragment>
    );
};

export default AuthGuard;
