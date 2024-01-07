'use client';

import { useState, useEffect, useMemo } from 'react';
import type { FunctionComponent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { getMatchingPath } from '@/lib/utils';
import type { NavigationLink } from '@/types';
import { Home, Calendar, Stats, Dollar, Planning, Gear, Question, Power } from '@components/ui/icons';

const views: Required<NavigationLink>[] = [
    { name: 'General overview', href: '/dashboard', icon: Home },
    { name: 'My events', href: '/dashboard/events', icon: Calendar },
    { name: 'Analytics', href: '/dashboard/analytics', icon: Stats },
    { name: 'Finance', href: '/dashboard/finance', icon: Dollar },
    { name: 'My plan', href: '/dashboard/plan', icon: Planning },
    { name: 'Settings', href: '/dashboard/settings', icon: Gear },
    { name: 'Help', href: '/dashboard/help', icon: Question },
];

const Sidebar: FunctionComponent = () => {
    const pathname = usePathname();
    const [activeViewIndex, setActiveViewIndex] = useState<number>(0);
    
    useEffect(() => {
        const activeView = getMatchingPath(pathname, views);

        setActiveViewIndex(views.indexOf(activeView as Required<NavigationLink>));
    }, [pathname]);

    return useMemo(() => (
        <aside className="flex flex-col gap-5 w-1/5 min-w-[250px] h-full text-white bg-black transition-all">
            <div className="relative w-2/3 aspect-square mx-auto">
                <Link href="/">
                    <Image
                        src="/logo-white.png"
                        alt="Logo"
                        fill
                    />
                </Link>
            </div>
            <ul className="flex flex-col gap-3 w-full flex-1 -mt-5 pl-5 overflow-y-auto">
                {views.map(({name, href, icon}, index) => {
                    const Icon = icon;

                    return (
                        <li
                            key={name}
                            onClick={() => setActiveViewIndex(index)}
                            className={`flex justify-start items-center w-full px-5 rounded-l-full ${
                                activeViewIndex === index ? 'font-medium bg-grey' : 'font-light'
                            }`}
                        >
                            <Icon className="w-5 h-5"/>
                            <Link href={href} className="flex justify-start items-center flex-1 h-14 pl-5">
                                {name}
                            </Link>
                            {name === 'My plan' && (
                                <Link
                                    href="/plan/upgrade"
                                    className={`flex justify-center items-center px-5 py-2 rounded-full text-sm font-medium transition-all ${
                                        pathname.indexOf(href) !== -1
                                            ? 'text-white bg-black'
                                            : 'text-black bg-white'
                                    }`}
                                >
                                    Upgrade
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ul>
            <Link href="/auth/signin" className="flex justify-start items-center w-full pl-10 pb-2.5">
                <Power className="w-5 h-5"/>
                <p className="flex justify-start items-center flex-1 h-14 pl-5">Log out</p>
            </Link>
        </aside>
    ), [activeViewIndex, pathname]);
};

export default Sidebar;
