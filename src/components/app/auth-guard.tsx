'use client';

import { Fragment, useEffect, useState } from 'react';
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
    const stringProfile = JSON.stringify(profile);
    const [canNavigate, setCanNavigate] = useState(true);

    useEffect(() => {
        if (
            Object.keys(profile).length === 0
            && routesToProtect.some((route) => pathname.startsWith(route))
        ) {
            setCanNavigate(false);
            router.replace('/auth/signin');
        } else {
            setCanNavigate(true);
        }
    }, [pathname, stringProfile]);
    
    return (
        <Fragment>
            {canNavigate && children}
        </Fragment>
    );
};

export default AuthGuard;
