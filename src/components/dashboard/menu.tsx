import type { FunctionComponent } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const views: {
    readonly name: string;
    readonly href: string;
    readonly icon: string;
}[] = [
    { name: 'General overview', href: '/dashboard', icon: '/icons/home.svg' },
    {
        name: 'My events',
        href: '/dashboard/events',
        icon: '/icons/calendar.svg',
    },
    {
        name: 'Analytics',
        href: '/dashboard/analytics',
        icon: '/icons/stats.svg',
    },
    { name: 'Finance', href: '/dashboard/finance', icon: '/icons/dollar.svg' },
    { name: 'My plan', href: '/dashboard/plan', icon: '/icons/planning.svg' },
    { name: 'Settings', href: '/dashboard/settings', icon: '/icons/gear.svg' },
    { name: 'Help', href: '/dashboard/help', icon: '/icons/question.svg' },
];

interface MenuProps {
    activeViewIndex: number;
    setActiveViewIndex: (index: number) => void;
}

const Menu: FunctionComponent<MenuProps> = ({
    activeViewIndex,
    setActiveViewIndex,
}) => {
    return (
        <aside className="flex flex-col gap-[20px] w-[330px] h-full pt-[30px] text-white bg-slate">
            <p className="pl-[40px] font-bold">Dashboard</p>
            <ul className="flex flex-col gap-[20px] w-full flex-1 pl-[20px]">
                {views.map(({ name, href, icon }, index) => (
                    <li
                        key={name}
                        onClick={() => setActiveViewIndex(index)}
                        className={`flex justify-start items-center w-full px-[20px] rounded-l-full ${
                            activeViewIndex === index
                                ? 'font-medium bg-grey'
                                : 'font-light'
                        }`}
                    >
                        <Image
                            src={icon}
                            alt={name}
                            width={22}
                            height={22}
                            className="w-[22px] h-[22px]"
                        />
                        <Link
                            href={href}
                            className="flex justify-start items-center flex-1 h-[50px] pl-[20px]"
                        >
                            {name}
                        </Link>
                        {name === 'My plan' && (
                            <Link
                                href="/plan/upgrade"
                                className="flex justify-center items-center px-4 py-2 rounded-full text-black text-xs font-medium bg-white"
                            >
                                Upgrade
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Menu;
