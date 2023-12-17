import type { FunctionComponent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProfilePicture from '@/components/dashboard/profile-picture';

const menuLinks: { readonly name: string; readonly href: string }[] = [
    { name: 'Home', href: '/' },
    { name: 'Discover', href: '/discover' },
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Ads', href: '/ads' },
    { name: 'Contact us', href: '/contact-us' },
];

const Header: FunctionComponent = () => {
    return (
        <header className="flex justify-between items-center w-screen h-36 max-h-36 px-[5vw] md:px-28">
            <Link href="/" className="min-w-max min-h-max">
                <Image
                    src="/logo.png"
                    alt="Event Media Logo"
                    width={150}
                    height={150}
                    className="w-[150px] h-[150px]"
                />
            </Link>
            <nav className="flex items-center gap-14 w-fit h-full ml-28">
                <ul className="flex flex-wrap items-center gap-14 h-full overflow-y-auto">
                    {menuLinks.map(({ name, href }) => (
                        <li key={name} className="font-medium">
                            <Link href={href}>{name}</Link>
                        </li>
                    ))}
                </ul>
                <Link href="/auth/signup" className="min-w-max min-h-max">
                    <ProfilePicture />
                </Link>
            </nav>
        </header>
    );
};

export default Header;
