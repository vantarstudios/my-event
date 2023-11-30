import type { FunctionComponent } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
                <Link href="/signup" className="min-w-max min-h-max">
                    <Image
                        src="/dash-profile.svg"
                        alt="Profile Picture"
                        width={60}
                        height={60}
                        className="w-[60px] h-[60px]"
                    />
                </Link>
            </nav>
        </header>
    );
};

export default Header;
