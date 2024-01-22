'use client';

import { useEffect, useState } from 'react';
import type { FunctionComponent } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getMatchingPath } from '@/lib/utils';
import type { NavigationLink } from '@/types';
import { Button } from '@components/ui/buttons';
import { Menu, Cross } from '@components/ui/icons';
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
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [activeViewIndex, setActiveViewIndex] = useState<number>(0);
    
    useEffect(() => {
        const activeView = getMatchingPath(pathname, menuLinks);
        
        setActiveViewIndex(menuLinks.indexOf(activeView as NavigationLink));
    }, [pathname]);
    
    return (
        <header className="fixed top-0 left-0 z-50 flex justify-between items-center w-screen h-28 md:h-[15vh] max-h-[15vh] pr-10 md:px-[5vw] bg-white shadow-md">
            <Link href="/" className="min-w-max min-h-max">
                <div className="relative w-36 h-36 md:w-40 md:h-40">
                    <Image
                        src="/logo.png"
                        alt="Event Media Logo"
                        fill
                    />
                </div>
            </Link>
            <nav className="hidden md:flex items-center gap-x-10 w-fit h-full">
                <ul className="flex flex-wrap items-center gap-x-10 h-full overflow-y-auto">
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
                <ProfilePicture asLink={true} showSignUp={true}/>
            </nav>
            <button
                type="button"
                onClick={() => setShowMenu(!showMenu)}
                className="md:hidden text-primary"
            >
                <Menu className="w-7 h-7"/>
            </button>
            <nav className={`md:hidden fixed top-0 left-0 z-50 flex flex-col items-center w-screen gap-12 sm:w-1/2 h-screen py-16 bg-black bg-gradient-to-b from-primary/25 to-black transform transition-all duration-300 ease-out ${
                    showMenu
                        ? 'opacity-100 translate-y-0 sm:translate-x-0 sm:translate-y-0'
                        : 'opacity-0 -translate-y-full sm:-translate-x-full sm:translate-y-0'
                }`}>
                <ul className="flex flex-col justify-between items-center flex-1">
                    {menuLinks.map(({ name, href }, index) => (
                        <li
                            key={name}
                            onClick={() => setShowMenu(false)}
                            className={`text-white ${
                                activeViewIndex === index
                                    ? 'relative font-semibold after:w-5/6 after:h-[0.3vh] after:bg-white after:absolute after:-bottom-[1vh] after:left-0 after:transition-all after:duration-500 after:ease-out'
                                    : 'font-light'
                            }`}
                        >
                            <Link href={href} replace>{name}</Link>
                        </li>
                    ))}
                </ul>
                <Link href="/dashboard" className="w-fit focus:outline-none">
                    <Button className="h-14 px-16 text-lg rounded-full font-normal bg-primary">Get Started</Button>
                </Link>
                <Button
                    type="button"
                    onClick={() => setShowMenu(false)}
                    className="flex justify-center items-center w-12 h-12 p-2 rounded-full text-black bg-white"
                >
                    <Cross className="w-7 h-7"/>
                </Button>
            </nav>
        </header>
    );
};

export default Header;
