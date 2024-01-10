import { useEffect, useState, type RefObject  } from 'react';

export function useAnimateOnScroll<T extends HTMLElement>(targetRef: RefObject<T>, animationClass: string): { isAnimated: boolean } {
    const [isAnimated, setIsAnimated] = useState<boolean>(false);

    useEffect(() => {
        const target = targetRef.current;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(animationClass);
                } else {
                    entry.target.classList.remove(animationClass);
                }
                
                setIsAnimated(entry.isIntersecting);
            });
        });
        
        if (target) {
            observer.observe(target);
        }
        
        return () => {
            if (target) {
                observer.unobserve(target);
            }
            
            observer.disconnect();
        };
    }, [targetRef, animationClass]);

    return { isAnimated };
}
