'use client';

import { useState, useEffect, useMemo } from 'react';
import type { FunctionComponent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { getMatchingPath } from '@/lib/utils';
import { useMutationRequest } from '@/lib/hooks';
import { authAPI } from '@/lib/api/auth';
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
    const router = useRouter();
    const [activeViewIndex, setActiveViewIndex] = useState<number>(0);
    
    const { trigger } = useMutationRequest(
        'sign-out',
        async () => {
            const response = await authAPI.signOut();
            return response.data;
        },
        'Signed out successfully!'
    );
    
    const handleSignOut = async () => {
        await trigger();
        router.push('/auth/signin');
    };
    
    useEffect(() => {
        const activeView = getMatchingPath(pathname, views);

        setActiveViewIndex(views.indexOf(activeView as Required<NavigationLink>));
    }, [pathname]);

    return useMemo(() => (
        <aside className="flex flex-col gap-5 w-1/5 min-w-[300px] h-full text-white bg-black transition-all">
            <Link href="/" className="w-full">
                <div className="relative w-2/3 aspect-square mx-auto">
                    <Image
                        src="/logo-white.png"
                        alt="Logo"
                        quality={100}
                        fill
                        priority
                        sizes="100%, 100%"
                    />
                </div>
            </Link>
            <ul className="flex flex-col gap-2 w-full flex-1 -mt-5 pl-5 overflow-y-auto">
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
            <div
                onClick={handleSignOut}
                className="flex justify-start items-center w-full pl-10 pb-2.5 cursor-pointer hover:text-red-500"
            >
                <Power className="w-5 h-5"/>
                <p className="flex justify-start items-center flex-1 h-14 pl-5">Log out</p>
            </div>
        </aside>
    ), [activeViewIndex, pathname]);
};

export default Sidebar;
