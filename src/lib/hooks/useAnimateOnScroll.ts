import { useEffect, useState, type RefObject  } from 'react';

export function useAnimateOnScroll<T extends HTMLElement>(targetRef: RefObject<T>, animationClass: string): { isAnimated: boolean } {
    const [isAnimated, setIsAnimated] = useState<boolean>(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    console.log('isIntersecting')
                    entry.target.classList.add(animationClass);
                    setIsAnimated(true);
                } else {
                    console.log('not isIntersecting')
                    entry.target.classList.remove(animationClass);
                    setIsAnimated(false);
                }
            });
        });
        
        if (targetRef.current) {
            observer.observe(targetRef.current);
        }
        
        return () => {
            if (targetRef.current) {
                observer.unobserve(targetRef.current);
            }
            
            observer.disconnect();
        };
    }, [targetRef]);

    return { isAnimated };
}
