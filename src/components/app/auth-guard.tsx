'use client';

import type { FunctionComponent, PropsWithChildren } from 'react';
import { usePathname, redirect, RedirectType } from 'next/navigation';
import { useSelector } from '@/lib/hooks';
import { selectIsAuthenticated } from '@/lib/store/is-authenticated.state';

const routesToProtect = [
    '/dashboard',
];

const AuthGuard: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const pathname = usePathname();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    
    const isProtectedRoute = routesToProtect.some((route) => pathname.startsWith(route));
    
    if (isProtectedRoute && !isAuthenticated) {
        redirect('/auth/signin', RedirectType.replace);
    }
    
    return children;
};

export default AuthGuard;
