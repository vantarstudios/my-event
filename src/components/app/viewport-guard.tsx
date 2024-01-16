'use client';

import { useCallback, useEffect, useState, type FunctionComponent, type PropsWithChildren } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const mobileViewPath = '/mobile';
const WIDTH_THRESHOLD = 768;

const ViewportGuard: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [viewportWidth, setViewportWidth] = useState<number>(WIDTH_THRESHOLD);
    const [lastValidPathname, setLastValidPathname] = useState<string>(pathname);
    
    const handleWindowResize = useCallback(() => {
        setViewportWidth(window.innerWidth);
    }, []);
    
    useEffect(() => {
        if (!pathname.startsWith(mobileViewPath) && viewportWidth < WIDTH_THRESHOLD) {
            setLastValidPathname(pathname);
            router.replace(mobileViewPath);
        }
        
        if (pathname.startsWith(mobileViewPath) && viewportWidth >= WIDTH_THRESHOLD) {
            router.replace(lastValidPathname);
        }
        
        if (window) {
            window.addEventListener('resize', handleWindowResize);
        }
        
        return () => {
            if (window) {
                window.removeEventListener('resize', handleWindowResize);
            }
        };
    }, [pathname, router, viewportWidth, lastValidPathname, handleWindowResize]);
    
    return children;
};

export default ViewportGuard;
