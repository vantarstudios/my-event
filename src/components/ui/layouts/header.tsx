'use client';

import { useEffect, useState } from 'react';
import type { FunctionComponent } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getMatchingPath } from '@/lib/utils';
import type { NavigationLink } from '@/types';
import ProfilePicture from './profile-picture';

const menuLinks: NavigationLink[] = [
    { name: 'Home', href: '/' },
    { name: 'Discover', href: '/discover' },
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Ads', href: '/ads' },
    { name: 'Contact us', href: '/contact-us' },
];

const Header: FunctionComponent = () => {
    const pathname = usePathname();
    const [activeViewIndex, setActiveViewIndex] = useState<number>(0);
    
    useEffect(() => {
        const activeView = getMatchingPath(pathname, menuLinks);
        
        setActiveViewIndex(menuLinks.indexOf(activeView as NavigationLink));
    }, [pathname]);
    
    return (
        <header className="fixed top-0 left-0 z-50 flex justify-between items-center w-screen h-[15vh] max-h-[15vh] px-28 bg-white shadow-md">
            <Link href="/" className="min-w-max min-h-max">
                <div className="relative w-40 h-40">
                    <Image
                        src="/logo.png"
                        alt="Event Media Logo"
                        fill
                    />
                </div>
            </Link>
            <nav className="flex items-center gap-10 w-fit h-full ml-28">
                <ul className="flex flex-wrap items-center gap-10 h-full overflow-y-auto">
                    {menuLinks.map(({ name, href }, index) => (
                        <li
                            key={name}
                            className={activeViewIndex === index
                                ? 'relative text-primary font-semibold after:w-5/6 after:h-[0.3vh] after:bg-primary after:absolute after:-bottom-[1vh] after:left-0 after:transition-all after:duration-500 after:ease-out'
                                : 'font-medium'
                            }
                        >
                            <Link href={href}>{name}</Link>
                        </li>
                    ))}
                </ul>
                <ProfilePicture/>
            </nav>
        </header>
    );
};

export default Header;
