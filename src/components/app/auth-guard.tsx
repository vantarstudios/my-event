'use client';

import { useEffect, type FunctionComponent, type PropsWithChildren } from 'react';
import { usePathname, redirect } from 'next/navigation';
import { useUserProfile } from '@/lib/hooks';

const routesToProtect = [
    '/dashboard',
];

const AuthGuard: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const pathname = usePathname();
    const { user, isLoading, error } = useUserProfile();
    
    useEffect(() => {
        const isProtectedRoute = routesToProtect.some((route) => pathname.startsWith(route));
        
        if (isProtectedRoute) {
            if (isLoading) {
                return;
            }

            if (error || !user) {
                redirect('/auth/signin');
            }
        }
    }, [pathname, user, isLoading, error]);
    
    return children;
};

export default AuthGuard;
