'use client';

import { useState, useEffect } from 'react';
import type { FunctionComponent, PropsWithChildren } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Stats, Dollar, Planning, Gear, Question } from '@components/ui/icons';
import type { IconProps } from '@/types';

type DashboardView = {
    readonly name: string;
    readonly href: string;
    readonly icon: FunctionComponent<IconProps>;
};

const views: DashboardView[] = [
    { name: 'General overview', href: '/dashboard', icon: Home },
    { name: 'My events', href: '/dashboard/events', icon: Calendar },
    { name: 'Analytics', href: '/dashboard/analytics', icon: Stats },
    { name: 'Finance', href: '/dashboard/finance', icon: Dollar },
    { name: 'My plan', href: '/dashboard/plan', icon: Planning },
    { name: 'Settings', href: '/dashboard/settings', icon: Gear },
    { name: 'Help', href: '/dashboard/help', icon: Question },
];

const Main: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const pathname = usePathname();
    const [activeViewIndex, setActiveViewIndex] = useState<number>(0);

    const isAsideVisible = pathname.indexOf('/dashboard/events/create') === -1;

    useEffect(() => {
        const activeView = views.reduce((prev, current) => {
            return pathname.startsWith(current.href) && current.href.length > prev!.href.length ? current : prev;
        }, views[0]);

        setActiveViewIndex(views.indexOf(activeView as DashboardView));
    }, [pathname]);

    return (
        <main className="flex w-screen h-[calc(100%-192px)] max-h-[calc(100%-192px)]">
            <aside
                className={`flex flex-col gap-8 w-1/5 min-w-[250px] h-full pt-10 text-white bg-black transition-all ${
                    !isAsideVisible && 'hidden'
                }`}
            >
                <p className="pl-10 text-lg font-bold">Dashboard</p>
                <ul className="flex flex-col gap-5 w-full flex-1 pl-5">
                    {views.map(({ name, href, icon }, index) => {
                        const Icon = icon;

                        return (
                            <li
                                key={name}
                                onClick={() => setActiveViewIndex(index)}
                                className={`flex justify-start items-center w-full px-5 rounded-l-full ${
                                    activeViewIndex === index ? 'font-medium bg-grey' : 'font-light'
                                }`}
                            >
                                <Icon className="w-6" />
                                <Link href={href} className="flex justify-start items-center flex-1 h-14 pl-5">
                                    {name}
                                </Link>
                                {name === 'My plan' && (
                                    <Link
                                        href="/plan/upgrade"
                                        className={`flex justify-center items-center px-5 py-3 rounded-full text-xs font-medium transition-all ${
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
            </aside>
            <section className="flex-1 h-full py-5 pl-10 child:pr-20 child:overflow-y-auto child:overflow-x-hidden">
                {children}
            </section>
        </main>
    );
};

export default Main;
