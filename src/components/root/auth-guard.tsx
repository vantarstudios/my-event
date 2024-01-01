'use client';

import { useEffect } from 'react';
import type { FunctionComponent, PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from '@/lib/hooks';
import { selectProfile } from '@/lib/store/profile';

const AuthGuard: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const router = useRouter();
    const profile = useSelector(selectProfile);
    
    useEffect(() => {
        const checkAuth = () => {
            if (!profile || Object.keys(profile).length === 0) {
                router.push('/auth/signin');
                return;
            }
        };
        
        checkAuth();
    }, [profile, router]);
    
    return (
        <>
            {children}
        </>
    );
};

export default AuthGuard;
