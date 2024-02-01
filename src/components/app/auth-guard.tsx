'use client';

import type { FunctionComponent, PropsWithChildren } from 'react';
import { usePathname, redirect, RedirectType } from 'next/navigation';
import Cookies from 'js-cookie';
import { IS_AUTHENTICATED_TOKEN_KEY } from '@/data/constants';

const routesToProtect = [
    '/dashboard',
];

const AuthGuard: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const pathname = usePathname();
    const isAuthenticated = !!Cookies.get(IS_AUTHENTICATED_TOKEN_KEY);

    const isProtectedRoute = routesToProtect.some((route) => pathname.startsWith(route));
    
    if (isProtectedRoute && !isAuthenticated) {
        redirect('/auth/signin', RedirectType.replace);
    }
    
    return children;
};

export default AuthGuard;
